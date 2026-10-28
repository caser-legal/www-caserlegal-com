import { handleAppStoreNotification } from '@/lib/appstore-notifications';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  return handleAppStoreNotification(request);
}
