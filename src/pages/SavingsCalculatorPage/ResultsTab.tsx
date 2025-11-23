import { useSavingsProducts } from '@entities/savings-product/api/useSavingsProductsQuery';
import { filterProductsByCriteria } from '@entities/savings-product/lib/filterProductsByCriteria';
import type { SavingsProduct } from '@/entities/savings-product/model/types';
import type { SavingsFormData } from '@widgets/savings-form/model/schema';
import { Suspense } from 'react';
import { EmptyState } from '@/shared/ui/EmptyState';
import { CalculationResult } from '@/widgets/calculation-result/ui/CalculationResult';
import { calculateSavingsResults } from '@/entities/savings-product/lib/calculateSavingsResults';
import { getTopProductsByAnnualRate } from '@/entities/savings-product/lib/getTopProductsByAnnualRate';
import { ProductList } from '@/widgets/product-list/ui/ProductList';
import { Border, ListHeader, Spacing } from 'tosslib';

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
  const { data: products } = useSavingsProducts();
  const filteredProducts = filterProductsByCriteria(products, {
    monthlyAmount: formValues.monthlyAmount,
    savingTerm: formValues.savingTerm,
  });

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
    <CalculationResult selectedProduct={selectedProduct} calculationResults={calculationResults}>
      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />

      <ProductList products={recommendedProducts} selectedProduct={selectedProduct} onProductSelect={onProductSelect} />
    </CalculationResult>
  );
}
