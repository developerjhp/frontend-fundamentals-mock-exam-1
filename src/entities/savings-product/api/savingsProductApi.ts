import { http } from 'tosslib';
import type { SavingsProduct } from '@entities/savings-product/model/types';

export async function fetchSavingsProducts(): Promise<SavingsProduct[]> {
  return http.get<SavingsProduct[]>('/api/savings-products');
}
