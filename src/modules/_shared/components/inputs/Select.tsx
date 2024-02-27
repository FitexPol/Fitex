import { type ComponentProps, type FormControl } from '../../types';
import { $tm } from '../../utils/$tm';

export type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  control: FormControl;
  options: SelectOption[];
  value?: string;
  label?: string;
  error?: string;
};

export function Select({
  control,
  options,
  value = '',
  label,
  class: className,
}: ComponentProps<SelectProps>) {
  return (
    <label class={`${$tm(className)}`}>
      {!!label && <span class="mb-1 ml-2 block text-sm">{label}</span>}
      <select name={control.name} class="h-[3.1rem]">
        {options?.map(({ value: optionValue, label }) => (
          <option value={optionValue} selected={optionValue === value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}
