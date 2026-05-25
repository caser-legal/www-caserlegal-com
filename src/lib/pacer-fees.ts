/** USCourts Electronic Public Access Fee Schedule (effective Jan 1, 2020). */

export const PACER_PAGE_FEE = 0.1;
export const PACER_DOCUMENT_MAX_FEE = 3;
export const PACER_DOCUMENT_PAGE_CAP = 30;
export const PACER_AUDIO_FILE_FEE = 2.4;
export const PACER_QUARTERLY_WAIVER_THRESHOLD = 30;

export function caseDocumentFee(pages: number): number {
  const billablePages = Math.min(Math.max(pages, 1), PACER_DOCUMENT_PAGE_CAP);
  return Math.min(billablePages * PACER_PAGE_FEE, PACER_DOCUMENT_MAX_FEE);
}

export function calculatePacerBilling({
  monthlySearches,
  pagesPerSearch,
  documentsPerMonth,
}: {
  monthlySearches: number;
  pagesPerSearch: number;
  documentsPerMonth: number;
}) {
  const pagesPerSearchBillable = Math.max(pagesPerSearch, 1);
  const pageCosts = monthlySearches * pagesPerSearchBillable * PACER_PAGE_FEE;
  const documentCosts = documentsPerMonth * caseDocumentFee(pagesPerSearch);
  const monthlyTotal = pageCosts + documentCosts;
  const quarterlyCharges = monthlyTotal * 3;
  const quarterlyBillable =
    quarterlyCharges > PACER_QUARTERLY_WAIVER_THRESHOLD ? quarterlyCharges : 0;
  const annualBillable = quarterlyBillable * 4;
  const annualUncapped = monthlyTotal * 12;

  return {
    pageCosts,
    documentCosts,
    monthlyTotal,
    quarterlyCharges,
    quarterlyBillable,
    annualUncapped,
    annualBillable,
  };
}
