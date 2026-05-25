/** Public contact address for CASER (support, careers, privacy, security). */
export const CONTACT_EMAIL = 'caserlegal@proton.me';

export function mailto(href: { subject?: string; body?: string } = {}): string {
  const params = new URLSearchParams();
  if (href.subject) params.set('subject', href.subject);
  if (href.body) params.set('body', href.body);
  const query = params.toString();
  return query ? `mailto:${CONTACT_EMAIL}?${query}` : `mailto:${CONTACT_EMAIL}`;
}
