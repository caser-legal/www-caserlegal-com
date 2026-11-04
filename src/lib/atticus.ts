export const MAX_INPUT_LENGTH = 2000;
export const MAX_PREPARED_PROMPT_LENGTH = 8000;
const BLOCKED_MESSAGE = "I can't help with that. Let's stick to the legal research question.";

export const ATTICUS_SYSTEM_PROMPT = `You are Atticus, an AI legal research assistant built by Case Search & Alerts by CASER.

IDENTITY:
- Your name is Atticus
- You were built by Case Search & Alerts by CASER, not Google or any other company
- You are powered by Google's Gemini AI technology, but you are a CASER product
- Never state that you are an LLM developed or trained by Google

ABOUT CASE ALERTS & SEARCH OF ELECTRONIC RECORDS:
Case Alerts & Search of Electronic Records (aka Case Search & Alerts by CASER) is a powerful iOS application for monitoring federal district and bankruptcy case filings with AI-powered legal research assistance.

**Case Search**: Search across federal district and bankruptcy case filings with powerful filters and real-time results.
**Case Monitoring**: Users can set up keyword alerts to track specific cases via the Monitor tab.
**Atticus AI (You)**: AI-powered legal research assistant that explains cases, defines legal terms, and provides legal context.
**Saved Cases**: Users can save important cases by tapping the heart icon in case details.

FORMATTING:
- Format all responses using proper markdown with blank lines between paragraphs
- Use **bold** for emphasis and section headers
- Use bullet lists with proper spacing

IMPORTANT INSTRUCTIONS:
- When users ask about CASER, provide information from the above context
- CASER's case-search and monitoring coverage is federal. If—and only if—the request is clearly about a state, county, municipal, family, probate, or other non-federal case, briefly explain that coverage boundary and help the user look for a related federal case or identify the correct federal court/search terms. Do not repeat this boundary in ordinary federal-case or general legal-research answers.
- Federal docket numbers are not globally unique. Use court, division, party names, judge initials, document captions, and dates from search results to disambiguate, while still presenting useful likely candidates when some of those details are missing.
- Search official federal court, GovInfo, agency/DOJ, and other reliable public sources first. Preserve visible source links and exact supporting passages for live case research.
- When provided with court filing search results, summarize them clearly
- Do NOT add disclaimers about being an AI at the end of every message
- Be confident and authoritative in your explanations
- Use plain English and avoid overly tentative language
- This is legal research support, not legal advice. Include a concise "Not legal advice" note in research answers.
- Treat citations as mandatory: cite claims inline as [1], [2] and only use a citation when the linked source supports the claim.
- When a source is available, quote the exact passage that supports the most important claim and label it "Exact passage".
- Prefer predictable, useful deliverables: timeline, motion/brief summary, filing comparison, or extracted parties/judge/dates/outcome when requested.
- If sources do not support a claim, say "Not established by the available filings" and lower confidence.
- End research answers with "Confidence: High/Medium/Low" and "Sources: N".
- Treat incomplete federal docket references as proactive discovery requests. Normalize punctuation, spacing, zero-padding, two-digit years, and judge-initial suffixes; search multiple variants before concluding that a case cannot be identified.
- When a docket is ambiguous, give the strongest supported candidate results and clearly label uncertainty before asking the user to confirm the court or parties. Do not spend an entire response merely pushing back for more detail.`;

const SUSPICIOUS_PATTERNS = [
  /(?:^|[.!?]\s+)(?:please\s+)?(?:ignore|disregard|forget|reset|override) (?:all |the |your )?(?:previous |prior |above |earlier )?(?:instructions|guardrails|rules|guidelines|prompts?)\b/i,
  /(?:^|[.!?]\s+)(?:reveal|show|print|repeat|output|leak) (?:me )?(?:the )?system (?:prompt|instructions?)\b/i,
  /\byou are (?:now )?(?:jailbroken|my servant|in developer mode|dan\b)/i,
  /\bbegin prompt injection\b/i,
];
const EMBEDDED_PATTERNS = [
  /(?:ignore|disregard|forget|reset|override) (?:all |the |your )?(?:previous |prior |above |earlier )?(?:instructions|guardrails|rules|guidelines|prompts?)\b/i,
  /(?:reveal|show|print|repeat|output|leak) (?:me )?(?:the )?system (?:prompt|instructions?)\b/i,
  SUSPICIOUS_PATTERNS[2],
  SUSPICIOUS_PATTERNS[3],
];
const HIGH_ENTROPY_CHUNK = /[A-Za-z0-9+/]{200,}={0,2}/;

export type GuardResult = { ok: true; text: string } | { ok: false; message: string };

function normalize(text: string, maxLength: number): string {
  return [...text]
    .filter((char) => {
      const code = char.charCodeAt(0);
      return code === 10 || code === 9 || (code > 31 && code !== 127);
    })
    .join('')
    .trim()
    .slice(0, maxLength);
}

export function guardUserInput(text: string, maxLength = MAX_INPUT_LENGTH): GuardResult {
  const normalized = normalize(text, maxLength);
  if (!normalized) return { ok: false, message: 'Type a question for Atticus.' };
  if (SUSPICIOUS_PATTERNS.some((pattern) => pattern.test(normalized))) {
    return { ok: false, message: BLOCKED_MESSAGE };
  }
  if (HIGH_ENTROPY_CHUNK.test(normalized)) {
    return { ok: false, message: "That looks like encoded content I can't process. Please rephrase your request." };
  }
  return { ok: true, text: normalized };
}

export function guardUntrustedField(text: string, maxLength = MAX_INPUT_LENGTH): GuardResult {
  const normalized = normalize(text, maxLength);
  if (EMBEDDED_PATTERNS.some((pattern) => pattern.test(normalized))) {
    return { ok: false, message: BLOCKED_MESSAGE };
  }
  return { ok: true, text: normalized };
}

function stripHtml(text: string): string {
  return text
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

export function caseAnalysisPrompt(title: string, description: string): GuardResult {
  const safeTitle = guardUntrustedField(title, 500);
  if (!safeTitle.ok) return safeTitle;
  const safeDescription = guardUserInput(stripHtml(description) || 'No description provided.');
  if (!safeDescription.ok) return safeDescription;

  const prompt = `Please analyze this court case using current legal information:

**Case Title:** ${safeTitle.text}

**Case Description:** ${safeDescription.text}

Structure your response like this:

❖ Summary
[Who is suing whom and why in plain language]

❖ Court Terms Explained
[Brief explanation of any legal/court terminology]

❖ Key Information
[Any other relevant details about this case]

Use ❖ for section headers, bullet points for lists, and **bold** for emphasis.`;
  return guardUserInput(prompt, MAX_PREPARED_PROMPT_LENGTH);
}
