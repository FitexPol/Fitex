import { type TextValidators } from '../types';

export function getTextValidators({
  minLength,
  maxLength,
  required,
}: TextValidators): JSX.HtmlInputTag | JSX.HtmlTextAreaTag {
  return {
    minlength: minLength,
    maxlength: maxLength,
    required,
  };
}
