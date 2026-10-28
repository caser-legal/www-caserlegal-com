import { caseInsights, handlePost } from '@/lib/case-intelligence';

export const runtime = 'nodejs';
export const maxDuration = 300;

export async function POST(request: Request) {
  return handlePost(request, (body) => caseInsights(body), { endpoint: 'case-insights', kind: 'briefing' });
}
