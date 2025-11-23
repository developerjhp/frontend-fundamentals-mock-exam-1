/**
 * 선택 가능한 저축 기간 (개월)
 */
export const AVAILABLE_TERMS = [6, 12, 24] as const;
/**
 * 저축 기간 타입
 */
export type SavingTerm = (typeof AVAILABLE_TERMS)[number];
