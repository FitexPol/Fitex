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
  const { validators, ...inputAttributes } = control;

  if (!validators) return inputAttributes;

  const validatorAttributes: JSX.HtmlInputTag = getValidatorAttributes(control.type, validators);

  return {
    ...inputAttributes,
    ...validatorAttributes,
  };
}

function getValidatorAttributes(
  controlType: FormControl['type'],
  validators: FormControl['validators'],
): JSX.HtmlInputTag {
  switch (controlType) {
    case 'number':
      return getNumberValidators(validators as NumberValidators);
    default:
      return getTextValidators(validators as TextValidators);
  }
}

function getNumberValidators(validators: NumberValidators): JSX.HtmlInputTag {
  return {
    min: validators.min?.value.toString(),
    max: validators.max?.value.toString(),
  };
}

function getTextValidators(validators: TextValidators): JSX.HtmlInputTag {
  return {
    maxlength: validators.maxLength?.value.toString(),
  };
}
