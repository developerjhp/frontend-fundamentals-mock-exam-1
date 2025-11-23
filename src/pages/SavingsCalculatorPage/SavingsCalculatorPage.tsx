import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Border, NavigationBar, Spacing } from 'tosslib';

import { SavingsForm } from '@widgets/savings-form/ui/SavingsForm';
import { savingsFormSchema, type SavingsFormData } from '@widgets/savings-form/model/schema';
import { ErrorBoundary } from '@shared/ui/ErrorBoundary';
import { Tabs } from '@shared/ui/Tabs';
import { ProductsTab } from './ProductsTab';
import { ResultsTab } from './ResultsTab';
import { AVAILABLE_TERMS } from '@/widgets/savings-form/model/constants';
import type { SavingsProduct } from '@/entities/savings-product/model/types';

export function SavingsCalculatorPage() {
  const [selectedProduct, setSelectedProduct] = useState<SavingsProduct | null>(null);
  const handleProductSelect = (product: SavingsProduct) => {
    setSelectedProduct(product);
  };

  const {
    watch,
    setValue,
    formState: { errors },
  } = useForm<SavingsFormData>({
    resolver: zodResolver(savingsFormSchema),
    defaultValues: {
      targetAmount: 0,
      monthlyAmount: 0,
      savingTerm: AVAILABLE_TERMS[1],
    },
    mode: 'onChange',
  });
  const formValues = watch();

  return (
    <>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      <SavingsForm formValues={formValues} setValue={setValue} errors={errors} />

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <ErrorBoundary>
        <Tabs
          tabs={[
            { value: 'products' as const, label: '적금 상품' },
            { value: 'results' as const, label: '계산 결과' },
          ]}
          content={{
            products: (
              <ProductsTab
                formValues={formValues}
                selectedProduct={selectedProduct}
                onProductSelect={handleProductSelect}
              />
            ),
            results: (
              <ResultsTab
                formValues={formValues}
                selectedProduct={selectedProduct}
                onProductSelect={handleProductSelect}
              />
            ),
          }}
        />
      </ErrorBoundary>
    </>
  );
}
