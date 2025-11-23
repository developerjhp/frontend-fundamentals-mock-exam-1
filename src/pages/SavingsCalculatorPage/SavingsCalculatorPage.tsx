import { Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Border, NavigationBar, Spacing, Tab } from 'tosslib';

import { SavingsForm } from '@widgets/savings-form/ui/SavingsForm';
import { savingsFormSchema, type SavingsFormData } from '@widgets/savings-form/model/schema';
import { ErrorBoundary } from '@shared/ui/ErrorBoundary';
import { TabContent } from '@pages/SavingsCalculatorPage/ui/TabContent';
import { AVAILABLE_TERMS } from '@/widgets/savings-form/model/constants';

type TabValue = 'products' | 'results';

export function SavingsCalculatorPage() {
  const [currentTab, setCurrentTab] = useState<TabValue>('products');
  const handleTabChange = (value: string) => {
    setCurrentTab(value as TabValue);
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

      <Tab onChange={handleTabChange}>
        <Tab.Item value="products" selected={currentTab === 'products'}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={currentTab === 'results'}>
          계산 결과
        </Tab.Item>
      </Tab>

      <ErrorBoundary>
        <Suspense fallback={<div style={{ padding: '16px', textAlign: 'center' }}>상품 목록 로딩 중...</div>}>
          <TabContent currentTab={currentTab} formValues={formValues} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
