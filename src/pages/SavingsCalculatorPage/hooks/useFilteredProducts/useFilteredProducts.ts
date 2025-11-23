import { useSavingsProducts } from '@/pages/SavingsCalculatorPage/hooks/useSavingsProducts/useSavingsProducts';
import { filterProductsByCriteria } from '@/pages/SavingsCalculatorPage/hooks/useFilteredProducts/filterProductsByCriteria';
import type { SavingsFormData } from '@/pages/SavingsCalculatorPage/types';

/**
 * 사용자 입력 조건에 맞는 필터링된 적금 상품 목록 조회
 * @param formValues 폼 입력 값
 * @returns 필터링된 적금 상품 목록과 전체 상품 목록
 */
export function useFilteredProducts(formValues: SavingsFormData) {
  const { data: products } = useSavingsProducts();

  const filteredProducts = filterProductsByCriteria(products, {
    monthlyAmount: formValues.monthlyAmount,
    savingTerm: formValues.savingTerm,
  });

  return { products, filteredProducts };
}
