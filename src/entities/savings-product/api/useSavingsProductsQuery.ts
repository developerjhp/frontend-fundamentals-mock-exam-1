import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchSavingsProducts } from '@entities/savings-product/api/savingsProductApi';

/**
 * 적금 상품 목록 조회
 * @returns 적금 상품 목록
 * @example
 * useSavingsProducts(); // { data: [{ id: 'savings-001', name: '기본 정기적금', annualRate: 1.5, minMonthlyAmount: 100000, maxMonthlyAmount: 1000000, availableTerms: 12 }, { id: 'savings-002', name: '희망 정기적금', annualRate: 2.0, minMonthlyAmount: 100000, maxMonthlyAmount: 1000000, availableTerms: 24 }] }
 */
export function useSavingsProducts() {
  return useSuspenseQuery({
    queryKey: ['savings-products'],
    queryFn: fetchSavingsProducts,
  });
}
