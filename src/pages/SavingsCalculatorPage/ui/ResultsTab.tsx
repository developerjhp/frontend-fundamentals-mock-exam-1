import { getTopProductsByAnnualRate } from '@entities/savings-product/lib/getTopProductsByAnnualRate';
import { calculateSavingsResults } from '@entities/savings-product/lib/calculateSavingsResults';
import { CalculationResult } from '@widgets/calculation-result/ui/CalculationResult';
import type { SavingsFormData } from '@widgets/savings-form/model/schema';
import type { SavingsProduct } from '@entities/savings-product/model/types';

interface ResultsTabProps {
  /**
   * 적금 상품 목록
   */
  products: SavingsProduct[];
  /**
   * 필터링된 적금 상품 목록
   */
  filteredProducts: SavingsProduct[];
  /**
   * 사용자 입력 값
   */
  formValues: SavingsFormData;
  /**
   * 선택된 적금 상품
   */
  selectedProduct: SavingsProduct | null;
  /**
   * 적금 상품 선택 핸들러
   */
  onProductSelect: (product: SavingsProduct) => void;
}

export function ResultsTab({
  products,
  filteredProducts,
  formValues,
  selectedProduct,
  onProductSelect,
}: ResultsTabProps) {
  const calculationResults = selectedProduct
    ? calculateSavingsResults({
        product: selectedProduct,
        targetAmount: formValues.targetAmount,
        monthlyAmount: formValues.monthlyAmount,
        savingTerm: formValues.savingTerm,
      })
    : null;
  const recommendedProducts = getTopProductsByAnnualRate(filteredProducts.length > 0 ? filteredProducts : products);

  return (
    <CalculationResult
      selectedProduct={selectedProduct}
      calculationResults={calculationResults}
      recommendedProducts={recommendedProducts}
      onProductSelect={onProductSelect}
    />
  );
}
