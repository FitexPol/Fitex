import { type ComponentProps, type FormControl } from '../../types';
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
    <label class={className}>
      {!!label && <span class="mb-1 ml-2 block text-sm">{label}</span>}
      <textarea
        {...textareaAttributes}
        placeholder={getPlaceholder(placeholder)}
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
