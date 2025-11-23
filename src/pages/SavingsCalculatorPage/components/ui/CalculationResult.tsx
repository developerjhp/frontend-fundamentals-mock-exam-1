import { colors, ListRow, Spacing } from 'tosslib';
import type { SavingsProduct } from '@/pages/SavingsCalculatorPage/types';
import { format } from '@shared/utils/format';

interface CalculationResultProps {
  /**
   * 선택된 적금 상품
   */
  selectedProduct: SavingsProduct | null;
  /**
   * 계산 결과
   */
  calculationResults: {
    expectedAmount: number;
    difference: number;
    recommendedMonthlyAmount: number;
  } | null;
}

export function CalculationResult({ selectedProduct, calculationResults }: CalculationResultProps) {
  if (selectedProduct == null) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />;
  }

  return (
    <>
      <Spacing size={8} />

      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="예상 수익 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${format.currency.won(calculationResults?.expectedAmount ?? 0)}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="목표 금액과의 차이"
            topProps={{ color: colors.grey600 }}
            bottom={`${(calculationResults?.difference ?? 0) >= 0 ? '' : '-'}${format.currency.won(
              Math.abs(calculationResults?.difference ?? 0)
            )}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="추천 월 납입 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${format.currency.won(calculationResults?.recommendedMonthlyAmount ?? 0)}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />

      <Spacing size={40} />
    </>
  );
}
