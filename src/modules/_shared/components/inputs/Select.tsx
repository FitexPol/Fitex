import type { DTO, FormControlProps, PropsWithClass } from '../../types';

export type SelectOption = {
  value: string;
  label: string;
};

type SelectProps<T extends DTO> = FormControlProps<T> & {
  options: SelectOption[];
};

export function Select<T extends DTO>({
  dto,
  name,
  options,
  value = '',
  label,
  placeholder,
  disabled,
  class: className,
  error,
}: PropsWithClass<SelectProps<T>>) {
  return (
    <label class={className}>
      {!!label && (
        <span class="mb-1 block text-sm" safe>
          {label}
        </span>
      )}
      <select
        name={String(name)}
        required={dto.required ? dto.required.some((required) => required === name) : false}
        disabled={disabled}
      >
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

      {error && <small>{error}</small>}
    </label>
  );
}
