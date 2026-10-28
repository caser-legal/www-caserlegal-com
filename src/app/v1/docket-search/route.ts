import { handleDocketSearch } from '@/lib/docket-search-endpoint';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: Request) {
  return handleDocketSearch(request);
}
