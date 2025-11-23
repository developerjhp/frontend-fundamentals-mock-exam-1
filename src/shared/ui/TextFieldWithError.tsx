import { ComponentProps } from 'react';
import { TextField, Text, Spacing, colors } from 'tosslib';

interface TextFieldWithErrorProps extends ComponentProps<typeof TextField> {
  /**
   * 에러 메시지
   */
  errorMessage?: string;
}

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
