import { ProductItem } from '@/pages/SavingsCalculatorPage/components/ui/ProductItem';
import { EmptyState } from '@shared/ui/EmptyState';
import type { SavingsProduct } from '@/pages/SavingsCalculatorPage/types';

interface ProductListProps {
  /**
   * 적금 상품 목록
   */
  products: SavingsProduct[];
  /**
   * 선택된 적금 상품
   */
  selectedProduct: SavingsProduct | null;
  /**
   * 적금 상품 선택 핸들러
   */
  onProductSelect: (product: SavingsProduct) => void;
}

export function ProductList({ products, selectedProduct, onProductSelect }: ProductListProps) {
  if (products.length === 0) {
    return <EmptyState title="조건에 맞는 상품이 없어요" description="다른 조건으로 검색해보세요" />;
  }

  return (
    <>
      {products.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          isSelected={selectedProduct?.id === product.id}
          onClick={() => onProductSelect(product)}
        />
      ))}
    </>
  );
}
