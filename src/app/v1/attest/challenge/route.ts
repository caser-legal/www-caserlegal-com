import { attestChallenge } from '@/lib/case-intelligence';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  return attestChallenge(request);
}
