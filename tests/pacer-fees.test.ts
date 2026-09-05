import assert from 'node:assert/strict';
import { test } from 'node:test';
import { calculatePacerBilling, caseDocumentFee } from '../src/lib/pacer-fees';
const usage = { monthlySearches: 100, pagesPerSearch: 5, documentsPerMonth: 30, pagesPerDocument: 5 };
test('retains document charges in the CASER comparison', () => {
  const result = calculatePacerBilling(usage);
  assert.equal(result.annualBillable, 780);
  assert.equal(result.remainingAnnualPacer, 180);
  assert.equal(result.netAnnualSavings, 585.01);
});
test('applies the quarterly waiver separately after reducing searches', () => {
  const result = calculatePacerBilling({ ...usage, documentsPerMonth: 10 });
  assert.equal(result.annualBillable, 660);
  assert.equal(result.remainingAnnualPacer, 0);
  assert.equal(result.netAnnualSavings, 645.01);
});
test('waives exactly $30 and bills the whole quarter above it', () => {
  assert.equal(calculatePacerBilling({ monthlySearches: 100, pagesPerSearch: 1, documentsPerMonth: 0 }).quarterlyBillable, 0);
  assert.equal(calculatePacerBilling({ monthlySearches: 101, pagesPerSearch: 1, documentsPerMonth: 0 }).quarterlyBillable, 30.3);
});
test('does not promise savings for zero usage or unreplaced searches', () => {
  assert.equal(calculatePacerBilling({ ...usage, searchesReplacedPercent: 0 }).netAnnualSavings, -14.99);
  assert.equal(calculatePacerBilling({ monthlySearches: 0, pagesPerSearch: 1, documentsPerMonth: 0 }).netAnnualSavings, -14.99);
});
test('document pages are independent of uncapped search pages', () => {
  assert.equal(caseDocumentFee(100), 3);
  assert.equal(calculatePacerBilling({ ...usage, pagesPerSearch: 100, pagesPerDocument: 1 }).documentCosts, 3);
  assert.equal(calculatePacerBilling({ ...usage, pagesPerSearch: 100 }).pageCosts, 1000);
  assert.equal(caseDocumentFee(Number.NaN), 0);
});
