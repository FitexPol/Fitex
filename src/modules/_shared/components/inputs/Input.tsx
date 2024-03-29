import type { Datalist, FormControl, NumberValidators, PropsWithClass } from '@types';

import { getTextValidators } from '../../utils/getTextValidators';

type InputProps = Htmx.Attributes & {
  control: FormControl;
  value?: string;
  label?: string;
  placeholder?: string;
  datalist?: Datalist;
  step?: string;
  isDisabled?: boolean;
  error?: string;
};

export function Input({
  control,
  value = '',
  label,
  placeholder,
  datalist,
  step,
  isDisabled,
  error,
  class: className,
  ...hxAttributes
}: PropsWithClass<InputProps>) {
  const inputAttributes: JSX.HtmlInputTag = getInputAttributes(control);

  return (
    <label class={className}>
      {!!label && <span class="mb-1 block text-sm">{label}</span>}
      <input
        {...hxAttributes}
        {...inputAttributes}
        placeholder={placeholder}
        value={value}
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

function getInputAttributes(control: FormControl): JSX.HtmlInputTag {
  let validatorAttributes: JSX.HtmlInputTag = {};

  if (control.validators) {
    switch (control.type) {
      case 'number':
        validatorAttributes = getNumberValidators(control.validators);
        break;
      default:
        validatorAttributes = getTextValidators(control.validators);
    }
  }

  const inputAttributes: JSX.HtmlInputTag = (() => {
    const inputAttributes = { ...control };
    delete inputAttributes.validators;

    return inputAttributes;
  })();

  return {
    ...inputAttributes,
    ...validatorAttributes,
  };
}

function getNumberValidators({ min, max, required }: NumberValidators): JSX.HtmlInputTag {
  return {
    min,
    max,
    required,
  };
}
