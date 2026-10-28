import { caseQuestionStream, handleStream } from '@/lib/case-intelligence';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: Request) {
  return handleStream(request, (body) => caseQuestionStream(body), {
    endpoint: 'case-question-stream',
    kind: 'question',
  });
}
