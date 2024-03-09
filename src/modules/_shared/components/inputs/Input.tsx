import type { ComponentProps, Datalist, FormControl, NumberValidators } from '@types';

import { getPlaceholder } from '../../utils/getPlaceholder';
import { getTextValidators } from '../../utils/getTextValidators';

type InputProps = HtmxAttributes & {
  control: FormControl;
  value?: string;
  label?: string;
  datalist?: Datalist;
  step?: string;
  isDisabled?: boolean;
  error?: string;
};

export function Input({
  control,
  value = '',
  label,
  datalist,
  step,
  isDisabled,
  error,
  class: className,
  ...hxAttributes
}: ComponentProps<InputProps>) {
  const { placeholder, ...inputAttributes }: JSX.HtmlInputTag = getInputAttributes(control);

  return (
    <label class={className}>
      {!!label && <span class="mb-1 ml-2 block text-sm">{label}</span>}
      <input
        {...hxAttributes}
        {...inputAttributes}
        placeholder={getPlaceholder(placeholder)}
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
