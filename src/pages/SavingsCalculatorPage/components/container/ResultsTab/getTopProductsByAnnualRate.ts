import type { SavingsProduct } from '@/pages/SavingsCalculatorPage/types';

/**
 * 연 이자율이 가장 높은 상위 N개의 적금 상품을 반환합니다.
 * @param products 필터링된 적금 상품 목록
 * @param count 반환할 상품 개수 (기본값: 2)
 * @returns 연 이자율 기준 상위 N개의 상품
 * @example
 * getTopProductsByAnnualRate([{ annualRate: 1.5 }, { annualRate: 2.0 }, { annualRate: 1.0 }], 2);
 * // [{ annualRate: 2.0 }, { annualRate: 1.5 }]
 */
export function getTopProductsByAnnualRate(products: SavingsProduct[], count = 2) {
  return [...products].sort((a, b) => b.annualRate - a.annualRate).slice(0, count);
}
