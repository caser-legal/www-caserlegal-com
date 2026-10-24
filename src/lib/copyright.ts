/** Copyright holder for site content and the CASER product name. */
export const COPYRIGHT_HOLDER = 'CASER, LLC';

/** Current calendar year for copyright notices (evaluated at render time). */
export function getCopyrightYear(): number {
  return new Date().getFullYear();
}
