import type { ComponentProps, FormControl, NumberValidators } from '@types';

import { $tm } from '../../utils/$tm';
import { getPlaceholder } from '../../utils/getPlaceholder';
import { getTextValidators } from '../../utils/getTextValidators';

type InputProps = {
  control: FormControl;
  value?: string;
  label?: string;
  datalist?: {
    id: string;
    options: string[];
  };
  error?: string;
};

export function Input({
  control,
  value = '',
  label,
  datalist,
  error,
  class: className,
}: ComponentProps<InputProps>) {
  const { placeholder, ...inputAttributes }: JSX.HtmlInputTag = getInputAttributes(control);

  return (
    <label class={`${$tm('relative mb-0 pb-2', className)}`}>
      {!!label && <span class="mb-1 ml-2 block text-sm">{label}</span>}
      <input
        {...inputAttributes}
        placeholder={getPlaceholder(placeholder)}
        value={value}
        list={datalist && datalist.id}
        class={$tm(error && 'border-red-600')}
        safe
      />
      {error && <span class="absolute bottom-1.5 left-0 px-4 text-xs text-red-600">{error}</span>}

      {!!datalist && (
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
