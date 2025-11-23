import { z } from 'zod';
import { AVAILABLE_TERMS } from '@/pages/SavingsCalculatorPage/constants';

export interface SavingsProduct {
  /**
   * 적금 상품 ID
   */
  id: string;
  /**
   * 적금 상품 이름
   */
  name: string;
  /**
   * 적금 상품 연 이자율
   */
  annualRate: number;
  /**
   * 적금 상품 최소 월 납입액
   */
  minMonthlyAmount: number;
  /**
   * 적금 상품 최대 월 납입액
   */
  maxMonthlyAmount: number;
  /**
   * 적금 상품 가입 가능한 기간
   */
  availableTerms: number;
}

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
