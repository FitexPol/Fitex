import type { DTO, DTOField, FormControlProps, PropsWithClass } from '../../types';

type TextareaProps<T extends DTO> = FormControlProps<T> & {
  rows?: string;
};

export function Textarea<T extends DTO>({
  dto,
  name,
  value = '',
  label,
  placeholder,
  rows,
  error,
  class: className,
}: PropsWithClass<TextareaProps<T>>) {
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
      <textarea
        {...validationAttributes}
        name={String(name)}
        placeholder={placeholder}
        rows={rows}
        aria-invalid={error && 'true'}
        class="resize-none px-4 py-3"
        safe
      >
        {value}
      </textarea>

      {error && <small>{error}</small>}
    </label>
  );
}
