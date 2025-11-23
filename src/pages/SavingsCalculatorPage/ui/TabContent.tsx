import { useState } from 'react';
import { useSavingsProducts } from '@entities/savings-product/api/useSavingsProductsQuery';
import { filterProductsByCriteria } from '@entities/savings-product/lib/filterProductsByCriteria';
import type { SavingsFormData } from '@widgets/savings-form/model/schema';
import { ResultsTab } from '@pages/SavingsCalculatorPage/ui/ResultsTab';
import { ProductList } from '@/widgets/product-list/ui/ProductList';
import { SavingsProduct } from '@/entities/savings-product/model/types';

type TabValue = 'products' | 'results';

interface TabContentProps {
  currentTab: TabValue;
  formValues: SavingsFormData;
}

export function TabContent({ currentTab, formValues }: TabContentProps) {
  const { data: products } = useSavingsProducts();
  const filteredProducts = filterProductsByCriteria(products, {
    monthlyAmount: formValues.monthlyAmount,
    savingTerm: formValues.savingTerm,
  });

  const [selectedProduct, setSelectedProduct] = useState<SavingsProduct | null>(null);
  const handleProductSelect = (product: SavingsProduct) => {
    setSelectedProduct(product);
  };

  return (
    <>
      {currentTab === 'products' && (
        <ProductList
          products={filteredProducts}
          selectedProduct={selectedProduct}
          onProductSelect={handleProductSelect}
        />
      )}
      {currentTab === 'results' && (
        <ResultsTab
          products={products}
          filteredProducts={filteredProducts}
          formValues={formValues}
          selectedProduct={selectedProduct}
          onProductSelect={handleProductSelect}
        />
      )}
    </>
  );
}
