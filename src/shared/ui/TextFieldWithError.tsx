import { ComponentProps } from 'react';
import { TextField, Text, Spacing, colors } from 'tosslib';

/**
 * TextFieldWithError Props 타입
 */
interface TextFieldWithErrorProps extends ComponentProps<typeof TextField> {
  /**
   * 에러 메시지 (선택사항)
   */
  errorMessage?: string;
}

/**
 * 에러 메시지를 표시할 수 있는 TextField 컴포넌트
 *
 * TextField의 모든 Props를 상속받으며, 추가로 errorMessage를 받아
 * 입력 필드 아래에 에러 메시지를 빨간색으로 표시합니다.
 *
 * @example
 * // 에러 메시지 없이 사용
 * <TextFieldWithError
 *   label="이름"
 *   value={name}
 *   onChange={(e) => setName(e.target.value)}
 * />
 *
 * @example
 * // 에러 메시지와 함께 사용
 * <TextFieldWithError
 *   label="금액"
 *   value={amount}
 *   onChange={(e) => setAmount(e.target.value)}
 *   errorMessage="금액은 0보다 커야 합니다"
 * />
 *
 * @param props - TextField의 모든 Props와 errorMessage
 * @returns 에러 메시지를 표시할 수 있는 TextField 컴포넌트
 */
export function TextFieldWithError({ errorMessage, ...props }: TextFieldWithErrorProps) {
  return (
    <div>
      <TextField {...props} />
      {errorMessage && (
        <>
          <Spacing size={4} />
          <div style={{ paddingLeft: '25px' }}>
            <Text fontSize={14} color={colors.red500} fontWeight="regular">
              {errorMessage}
            </Text>
          </div>
        </>
      )}
    </div>
  );
}
