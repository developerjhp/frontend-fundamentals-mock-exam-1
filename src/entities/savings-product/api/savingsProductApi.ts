import { http } from 'tosslib';
import type { SavingsProduct } from '@entities/savings-product/model/types';

// 개발 환경에서만 delay 추가 (Suspense 테스트용)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchSavingsProducts(): Promise<SavingsProduct[]> {
  // 개발 환경에서 2초 지연
  if (import.meta.env.DEV) {
    await delay(2000);

    // 50% 확률로 에러 발생 (ErrorBoundary 테스트용)
    if (Math.random() < 0.5) {
      throw new Error('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    }
  }

  return http.get<SavingsProduct[]>('/api/savings-products');
}
