import type { ValidationError } from 'elysia';

import type { Form, FormErrors } from '../../types';

export function getBodySchemaErrors<T extends Form>(
  error: Readonly<ValidationError>,
  form: T,
): FormErrors<T> {
  const formErrors: FormErrors<T> = Object.keys(form).reduce((acc, key) => {
    const fieldName = key as keyof T;
    const errorMsg = error.all.find(({ path }) => path === `/${String(fieldName)}`)?.schema.error;

    if (typeof errorMsg !== 'string') return acc;

    return { ...acc, [fieldName]: errorMsg };
  }, {} as FormErrors<T>);

  return formErrors;
}
