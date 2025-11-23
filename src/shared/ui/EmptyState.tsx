import { Text, Spacing, colors } from 'tosslib';

interface EmptyStateProps {
  /**
   * 제목
   */
  title: string;
  /**
   * 설명
   */
  description?: string;
}

/**
 * 빈 상태를 표시하는 컴포넌트
 *
 * @param title - 제목
 * @param description - 설명 (선택사항)
 *
 * @example
 * // 제목만 표시
 * <EmptyState title="데이터가 없습니다" />
 *
 * @example
 * // 제목과 설명 함께 표시
 * <EmptyState
 *   title="검색 결과가 없습니다"
 *   description="조건을 변경하여 다시 시도해보세요"
 * />
 *
 * @returns 빈 상태를 표시하는 컴포넌트
 */
export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        textAlign: 'center',
      }}
    >
      <Text fontSize={48} fontWeight="bold">
        🔍
      </Text>
      <Spacing size={16} />
      <Text fontSize={18} fontWeight="bold" color={colors.grey900}>
        {title}
      </Text>
      {description && (
        <>
          <Spacing size={8} />
          <Text fontSize={14} fontWeight="regular" color={colors.grey600}>
            {description}
          </Text>
        </>
      )}
    </div>
  );
}
