import { type ComponentProps, type FormControl } from '../../types';
import { getPlaceholder } from '../../utils/getPlaceholder';

export type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  control: FormControl;
  options: SelectOption[];
  value?: string;
  label?: string;
  isDisabled?: boolean;
  error?: string;
};

export function Select({
  control,
  options,
  value = '',
  label,
  isDisabled,
  class: className,
}: ComponentProps<SelectProps>) {
  return (
    <label class={className}>
      {!!label && <span class="mb-1 ml-2 block text-sm">{label}</span>}
      <select name={control.name} disabled={isDisabled}>
        {control.placeholder && (
          <option value="" disabled selected>
            {getPlaceholder(control.placeholder)}
          </option>
        )}
        {options?.map(({ value: optionValue, label }) => (
          <option value={optionValue} selected={optionValue === value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}
