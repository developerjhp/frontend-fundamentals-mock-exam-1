import { useFilteredProducts } from '@/pages/SavingsCalculatorPage/hooks/useFilteredProducts/useFilteredProducts';
import type { SavingsProduct, SavingsFormData } from '@/pages/SavingsCalculatorPage/types';
import { Suspense } from 'react';
import { EmptyState } from '@shared/ui/EmptyState';
import { CalculationResult } from '@/pages/SavingsCalculatorPage/components/ui/CalculationResult';
import { calculateSavingsResults } from '@/pages/SavingsCalculatorPage/components/container/ResultsTab/calculateSavingsResults';
import { getTopProductsByAnnualRate } from '@/pages/SavingsCalculatorPage/components/container/ResultsTab/getTopProductsByAnnualRate';
import { RecommendedProducts } from '@/pages/SavingsCalculatorPage/components/ui/RecommendedProducts';

interface ResultsTabContentProps {
  formValues: SavingsFormData;
  selectedProduct: SavingsProduct | null;
  onProductSelect: (product: SavingsProduct) => void;
}

export function ResultsTab({ formValues, selectedProduct, onProductSelect }: ResultsTabContentProps) {
  return (
    <Suspense fallback={<EmptyState title="계산 결과 로딩 중..." description="잠시만 기다려주세요..." />}>
      <ResultsTabContent formValues={formValues} selectedProduct={selectedProduct} onProductSelect={onProductSelect} />
    </Suspense>
  );
}

function ResultsTabContent({ formValues, selectedProduct, onProductSelect }: ResultsTabContentProps) {
  const calculationResults = selectedProduct
    ? calculateSavingsResults({
        product: selectedProduct,
        targetAmount: formValues.targetAmount,
        monthlyAmount: formValues.monthlyAmount,
        savingTerm: formValues.savingTerm,
      })
    : null;

  const { products, filteredProducts } = useFilteredProducts(formValues);
  const recommendedProducts = getTopProductsByAnnualRate(filteredProducts.length > 0 ? filteredProducts : products);

  return (
    <>
      <CalculationResult selectedProduct={selectedProduct} calculationResults={calculationResults} />
      <RecommendedProducts
        products={recommendedProducts}
        selectedProduct={selectedProduct}
        onProductSelect={onProductSelect}
      />
    </>
  );
}
