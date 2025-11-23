import { ChangeEvent } from 'react';
import { FieldErrors, UseFormSetValue } from 'react-hook-form';
import { SelectBottomSheet, Spacing } from 'tosslib';
import { format } from '@shared/utils/format';
import { parseNumberFromInput } from '@shared/utils/parseNumberFromInput';
import { TextFieldWithError } from '@shared/ui/TextFieldWithError';
import type { SavingsFormData } from '@/pages/SavingsCalculatorPage/types';
import { AVAILABLE_TERMS, SavingTerm } from '@/pages/SavingsCalculatorPage/constants';

interface SavingsFormProps {
  /**
   * 사용자 입력 값
   */
  formValues: SavingsFormData;
  /**
   * 사용자 입력 값 설정 핸들러
   */
  setValue: UseFormSetValue<SavingsFormData>;
  /**
   * 폼 에러
   */
  errors: FieldErrors<SavingsFormData>;
}

export function SavingsForm({ formValues, setValue, errors }: SavingsFormProps) {
  const handleTargetAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numValue = parseNumberFromInput(e.target.value);
    if (numValue !== null) {
      setValue('targetAmount', numValue, { shouldValidate: true });
    }
  };

  const handleMonthlyAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numValue = parseNumberFromInput(e.target.value);
    if (numValue !== null) {
      setValue('monthlyAmount', numValue, { shouldValidate: true });
    }
  };

  const handleTermChange = (value: SavingTerm) => {
    setValue('savingTerm', value);
  };

  return (
    <>
      <TextFieldWithError
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        value={formValues.targetAmount ? format.currency.won(formValues.targetAmount) : ''}
        onChange={handleTargetAmountChange}
        errorMessage={errors.targetAmount?.message}
      />
      <Spacing size={16} />
      <TextFieldWithError
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
        value={formValues.monthlyAmount ? format.currency.won(formValues.monthlyAmount) : ''}
        onChange={handleMonthlyAmountChange}
        errorMessage={errors.monthlyAmount?.message}
      />
      <Spacing size={16} />
      <SelectBottomSheet
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={formValues.savingTerm}
        onChange={handleTermChange}
      >
        {AVAILABLE_TERMS.map(term => (
          <SelectBottomSheet.Option key={term} value={term}>
            {term}개월
          </SelectBottomSheet.Option>
        ))}
      </SelectBottomSheet>
    </>
  );
}
