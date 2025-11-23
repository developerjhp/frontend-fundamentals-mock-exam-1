export const format = {
  /**
   * 통화 형식 포맷팅
   * @example
   * format.currency.won(1000000); // 1,000,000
   * format.currency.usd(1000000); // $1,000,000.00
   * format.currency.jpy(1000000); // ¥1,000,000
   */
  currency: {
    won: (amount: number): string => amount.toLocaleString('ko-KR'),
    usd: (amount: number): string =>
      amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    jpy: (amount: number): string => amount.toLocaleString('ja-JP'),
  },
};
