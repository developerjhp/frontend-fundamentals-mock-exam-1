/**
 * 입력값에서 쉼표를 제거하고 숫자로 파싱
 * @param value 사용자 입력 문자열 (쉼표 포함 가능)
 * @returns 파싱된 숫자 또는 유효하지 않은 경우 null
 * @example
 * parseNumberFromInput('1,000,000') // 1000000
 * parseNumberFromInput('abc') // null
 */
export function parseNumberFromInput(value: string): number | null {
  const numValue = Number(value.replace(/,/g, ''));
  return isNaN(numValue) ? null : numValue;
}
