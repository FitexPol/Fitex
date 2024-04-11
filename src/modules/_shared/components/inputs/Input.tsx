import type { DTO, DTOField, Datalist, FormControlProps, PropsWithClass } from '../../types';

type InputProps<T extends DTO> = Htmx.Attributes &
  FormControlProps<T> & {
    type?: 'text' | 'number' | 'password' | 'search';
    datalist?: Datalist;
    step?: string;
  };

export function Input<T extends DTO>({
  dto,
  name,
  type = 'text',
  value,
  label,
  placeholder,
  datalist,
  step,
  isDisabled,
  error,
  class: className,
  ...hxAttributes
}: PropsWithClass<InputProps<T>>) {
  const dtoField = dto.properties[String(name)] as DTOField;

  const validationAttributes: JSX.HtmlInputTag = {
    required: dto.required ? dto.required.some((required) => required === name) : false,
    minlength: dtoField.minLength,
    maxlength: dtoField.maxLength,
  };

  return (
    <label class={className}>
      {!!label && (
        <span class="mb-1 block text-sm" safe>
          {label}
        </span>
      )}

      <input
        {...hxAttributes}
        {...validationAttributes}
        name={String(name)}
        type={type}
        value={value}
        placeholder={placeholder}
        list={datalist?.id}
        step={step}
        disabled={isDisabled}
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
