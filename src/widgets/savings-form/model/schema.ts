import { z } from 'zod';
import { AVAILABLE_TERMS } from './constants';

/**
 * 적금 계산기 폼 스키마
 */
export const savingsFormSchema = z.object({
  targetAmount: z.number().positive('목표 금액은 0보다 커야 합니다'),
  monthlyAmount: z.number().positive('월 납입액은 0보다 커야 합니다'),
  savingTerm: z.union(AVAILABLE_TERMS.map(term => z.literal(term))),
});
/**
 * 적금 계산기 폼 데이터 타입
 */
export type SavingsFormData = z.infer<typeof savingsFormSchema>;
