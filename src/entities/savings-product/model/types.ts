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
