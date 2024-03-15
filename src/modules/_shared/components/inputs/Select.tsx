import { type ComponentProps, type FormControl } from '../../types';

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
}: ComponentProps<SelectProps>) {
  return (
    <label class={className}>
      {!!label && <span class="mb-1 block text-sm">{label}</span>}
      <select name={control.name} disabled={isDisabled}>
        {placeholder && (
          <option value="" disabled selected>
            {placeholder}
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
