export const CAREERS_EMAIL = 'careers@caserlegal.com';

export const CAREERS_APPLICATION_SUBJECT = 'General Application - CASER';

export const CAREERS_APPLICATION_BODY = `Hi CASER Team,

I'm interested in joining your team. Here's some information about me:

Name:
Role or area of interest:
Background:
Relevant experience:
Why I'm interested in CASER:
LinkedIn or portfolio (optional):

Please find my resume attached.

Thank you,`;

export function careersApplicationMailto(): string {
  const params = new URLSearchParams({
    subject: CAREERS_APPLICATION_SUBJECT,
    body: CAREERS_APPLICATION_BODY,
  });
  return `mailto:${CAREERS_EMAIL}?${params.toString()}`;
}

export function careersResumeMailto(): string {
  const params = new URLSearchParams({
    subject: 'Resume — CASER',
    body: `Hi CASER Team,

I'd like to share my resume for future opportunities.

Name:
Background:
Area of interest:

Thank you,`,
  });
  return `mailto:${CAREERS_EMAIL}?${params.toString()}`;
}
