import { Suspense } from 'react';
import { useFilteredProducts } from '@/pages/SavingsCalculatorPage/hooks/useFilteredProducts/useFilteredProducts';
import { ProductList } from '@/pages/SavingsCalculatorPage/components/ui/ProductList';
import type { SavingsProduct, SavingsFormData } from '@/pages/SavingsCalculatorPage/types';
import { EmptyState } from '@shared/ui/EmptyState';

interface ProductsTabProps {
  formValues: SavingsFormData;
  selectedProduct: SavingsProduct | null;
  onProductSelect: (product: SavingsProduct) => void;
}

export function ProductsTab({ formValues, selectedProduct, onProductSelect }: ProductsTabProps) {
  return (
    <Suspense fallback={<EmptyState title="상품 목록 로딩 중..." description="잠시만 기다려주세요..." />}>
      <ProductsTabContent formValues={formValues} selectedProduct={selectedProduct} onProductSelect={onProductSelect} />
    </Suspense>
  );
}

function ProductsTabContent({ formValues, selectedProduct, onProductSelect }: ProductsTabProps) {
  const { filteredProducts } = useFilteredProducts(formValues);

  return (
    <ProductList products={filteredProducts} selectedProduct={selectedProduct} onProductSelect={onProductSelect} />
  );
}
