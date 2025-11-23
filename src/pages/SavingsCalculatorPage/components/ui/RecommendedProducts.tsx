import { Border, ListHeader, Spacing } from 'tosslib';
import { ProductList } from '@/pages/SavingsCalculatorPage/components/ui/ProductList';
import type { SavingsProduct } from '@/pages/SavingsCalculatorPage/types';

interface RecommendedProductsProps {
  /**
   * 추천 상품 목록
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

export function RecommendedProducts({ products, selectedProduct, onProductSelect }: RecommendedProductsProps) {
  return (
    <>
      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />

      <ProductList products={products} selectedProduct={selectedProduct} onProductSelect={onProductSelect} />
    </>
  );
}
