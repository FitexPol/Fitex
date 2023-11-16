import type { ComponentProps, FormControl, NumberValidators, TextValidators } from '@types';

import $tm from '../utils/$tm';

type InputProps = {
  control: FormControl;
  error?: string;
};

export default function Input({
  control,
  error,
  class: className,
}: Omit<ComponentProps<InputProps>, 'children'>) {
  const inputAttributes: JSX.HtmlInputTag = getInputAttributes(control);

  return (
    <label class={$tm('relative mb-0 pb-2')}>
      <input {...inputAttributes} class={$tm(className, error && 'border-red-600')} />
      {error && <span class="absolute bottom-1.5 left-0 px-4 text-xs text-red-600">{error}</span>}
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

function getNumberValidators(validators: NumberValidators): JSX.HtmlInputTag {
  return {
    min: validators.min?.toString(),
    max: validators.max?.toString(),
    required: validators.required?.toString(),
  };
}

function getTextValidators(validators: TextValidators): JSX.HtmlInputTag {
  return {
    maxlength: validators.maxLength?.toString(),
    required: validators.required?.toString(),
  };
}
