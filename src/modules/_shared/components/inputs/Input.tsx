import type { DTO, DTOField, Datalist, FormControlProps, PropsWithClass } from '../../types';

type InputProps<T extends DTO> = Htmx.Attributes &
  FormControlProps<T> & {
    type?: 'text' | 'password' | 'search';
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
  const validationAttributes: JSX.HtmlInputTag = getValidationAttributes(dto, name);

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
        type={dtoField.type === 'number' ? dtoField.type : type}
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

function getValidationAttributes<T extends DTO>(dto: T, name: keyof T['properties']): JSX.HtmlInputTag {
  const dtoField = dto.properties[String(name)] as DTOField;

  let validationAttributes: JSX.HtmlInputTag = {
    required: dto.required ? dto.required.some((required) => required === name) : false,
  };

  switch (dtoField.type) {
    case 'number': {
      validationAttributes = {
        ...validationAttributes,
        min: dtoField.minimum,
        max: dtoField.maximum,
      };
      break;
    }
    default: {
      validationAttributes = {
        ...validationAttributes,
        minlength: dtoField.minLength,
        maxlength: dtoField.maxLength,
      };
    }
  }

  return validationAttributes;
}
