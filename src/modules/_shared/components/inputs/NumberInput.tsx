import type { DTO, Datalist, FormControlProps, PropsWithClass } from '../../types';

type NumberInputProps<T extends DTO> = Htmx.Attributes &
  FormControlProps<T> & {
    datalist?: Datalist;
    min?: string;
    max?: string;
    step?: string;
  };

export function NumberInput<T extends DTO>({
  dto,
  name,
  value,
  label,
  placeholder,
  datalist,
  min,
  max,
  step,
  disabled,
  error,
  class: className,
  ...hxAttributes
}: PropsWithClass<NumberInputProps<T>>) {
  return (
    <label class={className}>
      {!!label && (
        <span class="mb-1 block text-sm" safe>
          {label}
        </span>
      )}

      <input
        {...hxAttributes}
        name={String(name)}
        type="number"
        value={value}
        placeholder={placeholder}
        required={dto.required ? dto.required.some((required) => required === name) : false}
        min={min}
        max={max}
        list={datalist?.id}
        step={step}
        disabled={disabled}
        aria-invalid={error && 'true'}
        safe
      />

      {error && <small>{error}</small>}

      {datalist && (
        <datalist id={datalist.id}>
          {datalist.options.map((option) => (
            <option value={option} />
          ))}
        </datalist>
      )}
    </label>
  );
}
