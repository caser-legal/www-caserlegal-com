import { handleRedeem } from '@/lib/case-intelligence';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  return handleRedeem(request);
}
