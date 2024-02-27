import { type ComponentProps, type FormControl } from '../../types';
import { $tm } from '../../utils/$tm';
import { getPlaceholder } from '../../utils/getPlaceholder';
import { getTextValidators } from '../../utils/getTextValidators';

type TextareaProps = {
  control: FormControl;
  value?: string;
  label?: string;
  rows?: string;
  error?: string;
};

export function Textarea({
  control,
  value = '',
  label,
  rows,
  error,
  class: className,
}: ComponentProps<TextareaProps>) {
  const { placeholder, ...textareaAttributes }: JSX.HtmlTextAreaTag = getTextareaAttributes(control);

  return (
    <label class={`${$tm('relative mb-0 pb-2', className)}`}>
      {!!label && <span class="mb-1 ml-2 block text-sm">{label}</span>}
      <textarea
        {...textareaAttributes}
        placeholder={getPlaceholder(placeholder)}
        rows={rows}
        class={$tm('resize-none px-4 py-3', error && 'border-red-600')}
        safe
      >
        {value}
      </textarea>
      {error && <span class="absolute bottom-1.5 left-0 px-4 text-xs text-red-600">{error}</span>}
    </label>
  );
}

function getTextareaAttributes(control: FormControl): JSX.HtmlTextAreaTag {
  if (control.type !== 'text') throw new Error('Textarea control type must be text');

  const validatorAttributes: JSX.HtmlInputTag = control.validators
    ? getTextValidators(control.validators)
    : {};

  const textareaAttributes: JSX.HtmlInputTag = (() => {
    const textareaAttributes = { ...control };
    delete textareaAttributes.validators;

    return textareaAttributes;
  })();

  return {
    ...textareaAttributes,
    ...validatorAttributes,
  };
}
