import type { SavingsProduct } from '@/pages/SavingsCalculatorPage/types';

interface SavingsCalculationInput {
  /**
   * 적금 상품 정보
   */
  product: SavingsProduct;
  /**
   * 사용자 입력 목표 금액
   */
  targetAmount: number;
  /**
   * 사용자 입력 월 납입액
   */
  monthlyAmount: number;
  /**
   * 사용자 입력 저축 기간
   */
  savingTerm: number;
}

interface SavingsCalculationResult {
  /**
   * 예상 수익 금액
   */
  expectedAmount: number;
  /**
   * 목표 금액과의 차이
   */
  difference: number;
  /**
   * 추천 월 납입 금액
   */
  recommendedMonthlyAmount: number;
}

/**
 * 적금 상품의 예상 수익, 목표 금액과의 차이, 추천 월 납입액을 계산합니다.
 * @param input 적금 상품 정보
 * @returns 예상 수익, 목표 금액과의 차이, 추천 월 납입액
 * @example
 * calculateSavingsResults({ product: { annualRate: 1.5 }, targetAmount: 1000000, monthlyAmount: 100000, savingTerm: 12 }); // { expectedAmount: 1200000, difference: 0, recommendedMonthlyAmount: 833000 }
 */
export function calculateSavingsResults(input: SavingsCalculationInput): SavingsCalculationResult {
  const { product, targetAmount, monthlyAmount, savingTerm } = input;

  const expectedAmount = calculateExpectedAmount(monthlyAmount, savingTerm, product.annualRate);
  const difference = Math.floor(targetAmount - expectedAmount);
  const recommendedMonthlyAmount = calculateRecommendedMonthlyAmount(targetAmount, savingTerm, product.annualRate);

  return {
    expectedAmount,
    difference,
    recommendedMonthlyAmount,
  };
}

/**
 * 연 이자율 계산 승수
 * @param annualRate 연 이자율
 * @returns 1 + (annualRate / 100) * 0.5
 * @example
 * calculateAnnualInterestRate(1.5); // 1.075
 * calculateAnnualInterestRate(2.0); // 1.1
 */
function calculateAnnualInterestRate(annualRate: number): number {
  return 1 + (annualRate / 100) * 0.5;
}

/**
 * 예상 수익 금액 계산
 * @param monthlyAmount 월 납입액
 * @param savingTerm 저축 기간
 * @param annualRate 연 이자율
 * @returns monthlyAmount * savingTerm * calculateAnnualInterestRate(annualRate)
 * @example
 * calculateExpectedAmount(1000000, 12, 1.5); // 1200000
 * calculateExpectedAmount(1000000, 12, 2.0); // 1400000
 */
function calculateExpectedAmount(monthlyAmount: number, savingTerm: number, annualRate: number): number {
  return Math.floor(monthlyAmount * savingTerm * calculateAnnualInterestRate(annualRate));
}

/**
 * 추천 월 납입 금액 계산 (1,000원 단위 반올림)
 * @param targetAmount 목표 금액
 * @param savingTerm 저축 기간
 * @param annualRate 연 이자율
 * @returns Math.round(amount / 1000) * 1000
 * @example
 * calculateRecommendedMonthlyAmount(1000000, 12, 1.5); // 833000
 * calculateRecommendedMonthlyAmount(1000000, 12, 2.0); // 667000
 */
function calculateRecommendedMonthlyAmount(targetAmount: number, savingTerm: number, annualRate: number): number {
  const amount = targetAmount / (savingTerm * calculateAnnualInterestRate(annualRate));
  return Math.round(amount / 1000) * 1000;
}
