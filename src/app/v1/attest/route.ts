import { attestDevice, handleAttestPost } from '@/lib/case-intelligence';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  return handleAttestPost(request, (body) => attestDevice(body));
}
