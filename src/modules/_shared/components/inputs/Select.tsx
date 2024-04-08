import type { FormControl, PropsWithClass } from '../../types';

export type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  control: FormControl;
  options: SelectOption[];
  value?: string;
  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
  error?: string;
};

export function Select({
  control,
  options,
  value = '',
  label,
  placeholder,
  isDisabled,
  class: className,
}: PropsWithClass<SelectProps>) {
  return (
    <label class={className}>
      {!!label && (
        <span class="mb-1 block text-sm" safe>
          {label}
        </span>
      )}
      <select name={control.name} disabled={isDisabled}>
        {placeholder && (
          <option value="" disabled selected safe>
            {placeholder}
          </option>
        )}
        {options?.map(({ value: optionValue, label }) => (
          <option value={optionValue} selected={optionValue === value} safe>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}
