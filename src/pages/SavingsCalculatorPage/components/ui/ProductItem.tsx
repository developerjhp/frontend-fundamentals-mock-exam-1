import { Assets, colors, ListRow } from 'tosslib';
import type { SavingsProduct } from '@/pages/SavingsCalculatorPage/types';
import { format } from '@shared/utils/format';

const STYLES = {
  title: { fontSize: 16, fontWeight: 'bold' as const, color: colors.grey900 },
  rate: { fontSize: 14, color: colors.blue600, fontWeight: 'medium' as const },
  detail: { fontSize: 13, color: colors.grey600 },
} as const;

interface ProductItemProps {
  /**
   * 적금 상품
   */
  product: SavingsProduct;
  /**
   * 선택 여부
   */
  isSelected?: boolean;
  /**
   * 클릭 핸들러
   */
  onClick?: () => void;
}

export function ProductItem({ product, isSelected, onClick }: ProductItemProps) {
  return (
    <ListRow
      contents={
        <ListRow.Texts
          type="3RowTypeA"
          top={product.name}
          topProps={STYLES.title}
          middle={formatRateText(product.annualRate)}
          middleProps={STYLES.rate}
          bottom={formatAmountRangeText(product.minMonthlyAmount, product.maxMonthlyAmount, product.availableTerms)}
          bottomProps={STYLES.detail}
        />
      }
      right={isSelected ? <Assets.Icon name="icon-check-circle-green" /> : undefined}
      onClick={onClick}
    />
  );
}

/**
 * 연 이자율 형식 포맷팅
 * @param rate 연 이자율
 * @returns 연 이자율: ${rate}%
 */
function formatRateText(rate: number): string {
  return `연 이자율: ${rate}%`;
}

/**
 * 최소 금액 ~ 최대 금액 | 저축 기간 형식 포맷팅
 * @param min 최소 금액
 * @param max 최대 금액
 * @param terms 저축 기간
 * @returns ${format.currency.won(min)}원 ~ ${format.currency.won(max)}원 | ${terms}개월
 */
function formatAmountRangeText(min: number, max: number, terms: number): string {
  return `${format.currency.won(min)}원 ~ ${format.currency.won(max)}원 | ${terms}개월`;
}
