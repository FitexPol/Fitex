import type { DTO, FormControlProps, PropsWithClass } from '../../types';

export type SelectOption = {
  value: string;
  label: string;
};

type SelectProps<T extends DTO> = FormControlProps<T> & {
  options: SelectOption[];
};

export function Select<T extends DTO>({
  name,
  options,
  value = '',
  label,
  placeholder,
  isDisabled,
  class: className,
}: PropsWithClass<SelectProps<T>>) {
  return (
    <label class={className}>
      {!!label && (
        <span class="mb-1 block text-sm" safe>
          {label}
        </span>
      )}
      <select name={String(name)} disabled={isDisabled}>
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
