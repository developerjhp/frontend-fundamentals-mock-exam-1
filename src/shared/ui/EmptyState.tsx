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
