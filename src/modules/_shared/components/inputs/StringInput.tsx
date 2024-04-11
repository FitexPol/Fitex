import type { DTO, DTOField, Datalist, FormControlProps, PropsWithClass } from '../../types';

type StringInputProps<T extends DTO> = Htmx.Attributes &
  FormControlProps<T> & {
    type?: 'text' | 'password' | 'search';
    datalist?: Datalist;
  };

export function StringInput<T extends DTO>({
  dto,
  name,
  type = 'text',
  value,
  label,
  placeholder,
  datalist,
  isDisabled,
  error,
  class: className,
  ...hxAttributes
}: PropsWithClass<StringInputProps<T>>) {
  const dtoField = dto.properties[String(name)] as DTOField;

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
        type={type}
        value={value}
        placeholder={placeholder}
        required={dto.required ? dto.required.some((required) => required === name) : false}
        minlength={dtoField.minLength}
        maxlength={dtoField.maxLength}
        list={datalist?.id}
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
