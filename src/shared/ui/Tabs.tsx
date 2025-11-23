import { ReactNode, useState } from 'react';
import { Tab } from 'tosslib';

interface TabConfig<T extends string> {
  /**
   * 탭 값
   */
  value: T;
  /**
   * 탭 라벨
   */
  label: string;
}

interface TabsProps<T extends string> {
  /**
   * 탭 목록
   */
  tabs: ReadonlyArray<TabConfig<T>>;
  /**
   * 탭 콘텐츠
   */
  content: Record<T, ReactNode>;
  /**
   * 기본 탭
   */
  defaultTab?: T;
}

/**
 * 탭 UI 컴포넌트
 *
 * 여러 탭과 각 탭에 해당하는 콘텐츠를 표시합니다.
 *
 * @template T - 탭 값의 타입 (string literal union)
 *
 * @example
 *
 * const tabs = [
 *   { value: 'results', label: '계산 결과' },
 *   { value: 'products', label: '상품 목록' }
 * ] as const;
 *
 * const content = {
 *   results: <ResultsContent />,
 *   products: <ProductsContent />
 * };
 *
 * <Tabs tabs={tabs} content={content} defaultTab="results" />
 *  */
export function Tabs<T extends string>({ tabs, content, defaultTab }: TabsProps<T>) {
  const [currentTab, setCurrentTab] = useState<T>(defaultTab ?? tabs[0].value);

  const handleTabChange = (value: string) => {
    setCurrentTab(value as T);
  };

  return (
    <>
      <Tab onChange={handleTabChange}>
        {tabs.map(tab => (
          <Tab.Item key={tab.value} value={tab.value} selected={currentTab === tab.value}>
            {tab.label}
          </Tab.Item>
        ))}
      </Tab>
      {content[currentTab]}
    </>
  );
}
