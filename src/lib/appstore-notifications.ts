import { CaseIntelligenceError, errorResponse, okResponse, readJsonBody } from './case-intelligence';
import type { MeterStore } from './meter-store';
import { meterKeys, meterStores } from './metering';
import {
  appleNotificationVerifier,
  revocationKeys,
  type NotificationVerifier,
  type ServerNotification,
  type SignedTransaction,
} from './storekit';

export const NOTIFICATION_URL = 'https://www.caserlegal.com/v1/appstore/notifications';
const MAX_NOTIFICATION_BYTES = 64 * 1024;
const RECORD_TTL_SECONDS = 400 * 86400;
const SEEN_TTL_SECONDS = 30 * 86400;

let defaultVerifier: NotificationVerifier | undefined;

async function debitRefundedCredits(store: MeterStore, transaction: SignedTransaction): Promise<void> {
  const redeemed = await store.get(meterKeys.redeemed(transaction.transactionId));
  if (!redeemed) return;
  const [account, , granted] = redeemed.split(':');
  const uses = Number(granted);
  if (!account || !Number.isInteger(uses) || uses <= 0) return;
  const marker = meterKeys.refundDebit(transaction.transactionId);
  if (!(await store.setIfAbsent(marker, 'pending', RECORD_TTL_SECONDS))) return;
  try {
    const balance = await store.incr(meterKeys.credits(account), -uses);
    if (balance < 0) await store.incr(meterKeys.credits(account), -balance);
    await store.set(marker, String(balance < 0 ? uses + balance : uses), RECORD_TTL_SECONDS);
  } catch (error) {
    await store.del(marker).catch(() => undefined);
    throw error;
  }
}

async function restoreRefundedCredits(store: MeterStore, transaction: SignedTransaction): Promise<void> {
  const marker = meterKeys.refundDebit(transaction.transactionId);
  const debited = Number(await store.get(marker));
  const redeemed = await store.get(meterKeys.redeemed(transaction.transactionId));
  const account = redeemed?.split(':')[0];
  if (!account || !Number.isInteger(debited) || debited <= 0) return;
  await store.del(marker);
  await store.incr(meterKeys.credits(account), debited);
}

export async function applyNotification(store: MeterStore, notification: ServerNotification, now = Date.now()): Promise<void> {
  const transaction = notification.transaction;
  if (!transaction) return;
  const covered = transaction.expiresDate ?? Number.MAX_SAFE_INTEGER;
  switch (notification.notificationType) {
    case 'REFUND':
    case 'REVOKE':
      await store.set(revocationKeys.transaction(transaction.transactionId), String(transaction.revocationDate ?? now), RECORD_TTL_SECONDS);
      await store.setIfGreater(revocationKeys.original(transaction.originalTransactionId), covered, RECORD_TTL_SECONDS);
      await debitRefundedCredits(store, transaction);
      return;
    case 'REFUND_REVERSED':
      await store.del(revocationKeys.transaction(transaction.transactionId));
      await store.del(revocationKeys.original(transaction.originalTransactionId));
      await restoreRefundedCredits(store, transaction);
      return;
    case 'DID_FAIL_TO_RENEW':
      if (notification.subtype === 'GRACE_PERIOD') return;
      await store.setIfGreater(revocationKeys.expired(transaction.originalTransactionId), transaction.expiresDate ?? now, RECORD_TTL_SECONDS);
      return;
    case 'EXPIRED':
    case 'GRACE_PERIOD_EXPIRED':
      await store.setIfGreater(revocationKeys.expired(transaction.originalTransactionId), transaction.expiresDate ?? now, RECORD_TTL_SECONDS);
      return;
  }
}

export async function handleAppStoreNotification(request: Request, verify?: NotificationVerifier): Promise<Response> {
  try {
    const body = await readJsonBody(request, MAX_NOTIFICATION_BYTES);
    const signedPayload = body && typeof body === 'object' ? (body as { signedPayload?: unknown }).signedPayload : undefined;
    if (typeof signedPayload !== 'string' || !signedPayload) throw new CaseIntelligenceError(400, 'invalid_notification');
    let notification: ServerNotification;
    try {
      notification = await (verify ?? (defaultVerifier ??= appleNotificationVerifier()))(signedPayload);
    } catch {
      throw new CaseIntelligenceError(400, 'invalid_notification');
    }
    const { store, now } = meterStores();
    if (!store) throw new CaseIntelligenceError(503, 'notifications_unavailable');
    const seen = meterKeys.notification(notification.notificationUUID);
    try {
      if (!(await store.setIfAbsent(seen, notification.notificationType, SEEN_TTL_SECONDS))) {
        return okResponse({ ok: true, duplicate: true });
      }
      try {
        await applyNotification(store, notification, now);
      } catch (error) {
        await store.del(seen).catch(() => undefined);
        throw error;
      }
    } catch (error) {
      console.error('appstore_notification_failed', error instanceof Error ? error.message : 'Error');
      throw new CaseIntelligenceError(503, 'notifications_unavailable');
    }
    return okResponse({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}
