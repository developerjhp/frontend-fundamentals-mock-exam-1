import { useQuery } from '@tanstack/react-query';
import { fetchSavingsProducts } from '@entities/savings-product/api/savingsProductApi';

export function useSavingsProducts() {
  return useQuery({
    queryKey: ['savings-products'],
    queryFn: fetchSavingsProducts,
  });
}
