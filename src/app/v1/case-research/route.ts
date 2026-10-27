import { caseResearch, handlePost } from '@/lib/case-intelligence';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: Request) {
  return handlePost(request, (body) => caseResearch(body));
}
