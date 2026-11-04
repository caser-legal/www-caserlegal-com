export const PACER_PAGE_FEE = 0.1;
export const PACER_DOCUMENT_MAX_FEE = 3;
export const PACER_DOCUMENT_PAGE_CAP = 30;
export const PACER_AUDIO_FILE_FEE = 2.4;
export const PACER_QUARTERLY_WAIVER_THRESHOLD = 30;
const nonnegative = (value: number) => Number.isFinite(value) ? Math.max(0, value) : 0;
const money = (value: number) => Math.round(value * 100) / 100;
const quarterlyBill = (monthly: number) => {
  const charges = money(monthly * 3);
  return charges > PACER_QUARTERLY_WAIVER_THRESHOLD ? charges : 0;
};
export function caseDocumentFee(pages: number): number {
  return money(Math.min(nonnegative(pages), PACER_DOCUMENT_PAGE_CAP) * PACER_PAGE_FEE);
}
export function calculatePacerBilling({ monthlySearches, pagesPerSearch, documentsPerMonth,
  pagesPerDocument = 5, searchesReplacedPercent = 100, annualSubscription = 14.99,
}: { monthlySearches: number; pagesPerSearch: number; documentsPerMonth: number;
  pagesPerDocument?: number; searchesReplacedPercent?: number; annualSubscription?: number }) {
  const pageCosts = money(nonnegative(monthlySearches) * nonnegative(pagesPerSearch) * PACER_PAGE_FEE);
  const documentCosts = money(nonnegative(documentsPerMonth) * caseDocumentFee(pagesPerDocument));
  const monthlyTotal = money(pageCosts + documentCosts);
  const quarterlyCharges = money(monthlyTotal * 3);
  const quarterlyBillable = quarterlyBill(monthlyTotal);
  const annualBillable = money(quarterlyBillable * 4);
  const remainingSearchCosts = money(pageCosts * (1 - Math.min(100, nonnegative(searchesReplacedPercent)) / 100));
  const remainingAnnualPacer = money(quarterlyBill(documentCosts + remainingSearchCosts) * 4);
  const annualWithCaser = money(remainingAnnualPacer + nonnegative(annualSubscription));
  return { pageCosts, documentCosts, monthlyTotal, quarterlyCharges, quarterlyBillable,
    annualUncapped: money(monthlyTotal * 12), annualBillable, remainingAnnualPacer,
    annualWithCaser, netAnnualSavings: money(annualBillable - annualWithCaser) };
}
