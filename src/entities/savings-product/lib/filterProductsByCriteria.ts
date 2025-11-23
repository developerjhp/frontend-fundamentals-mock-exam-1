import type { SavingsProduct } from '@entities/savings-product/model/types';

interface FilterCriteria {
  monthlyAmount?: number;
  savingTerm?: number;
}

/**
 * 사용자 입력 조건에 맞는 가입 가능한 상품 필터링
 * @param products 전체 상품 목록
 * @param criteria 필터링 조건
 * @returns 조건을 만족하는 상품 목록
 * 필터링 조건:
 * - 월 납입액: product.minMonthlyAmount(최소 월 납입액) < criteria.monthlyAmount(사용자 입력 월 납입액) < product.maxMonthlyAmount(최대 월 납입액)
 * - 저축 기간: product.availableTerms(저축 기간) === criteria.savingTerm(사용자 입력 저축 기간)
 * @example
 * filterProductsByCriteria([{ minMonthlyAmount: 100000, maxMonthlyAmount: 1000000, availableTerms: 12 }, { minMonthlyAmount: 100000, maxMonthlyAmount: 1000000, availableTerms: 24 }], { monthlyAmount: 100000, savingTerm: 12 });
 * // [{ minMonthlyAmount: 100000, maxMonthlyAmount: 1000000, availableTerms: 12 }]
 */
export function filterProductsByCriteria(products: SavingsProduct[], criteria: FilterCriteria) {
  const { monthlyAmount, savingTerm } = criteria;

  if (monthlyAmount === undefined || savingTerm === undefined) {
    return products;
  }

  return products.filter(product => {
    const isMonthlyAmountValid = product.minMonthlyAmount < monthlyAmount && monthlyAmount < product.maxMonthlyAmount;
    const isTermValid = product.availableTerms === savingTerm;

    return isMonthlyAmountValid && isTermValid;
  });
}
