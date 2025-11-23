import { Suspense } from 'react';
import { useSavingsProducts } from '@entities/savings-product/api/useSavingsProductsQuery';
import { filterProductsByCriteria } from '@entities/savings-product/lib/filterProductsByCriteria';
import { ProductList } from '@/widgets/product-list/ui/ProductList';
import type { SavingsProduct } from '@/entities/savings-product/model/types';
import type { SavingsFormData } from '@widgets/savings-form/model/schema';
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
  const { data: products } = useSavingsProducts();
  const filteredProducts = filterProductsByCriteria(products, {
    monthlyAmount: formValues.monthlyAmount,
    savingTerm: formValues.savingTerm,
  });

  return (
    <ProductList products={filteredProducts} selectedProduct={selectedProduct} onProductSelect={onProductSelect} />
  );
}
