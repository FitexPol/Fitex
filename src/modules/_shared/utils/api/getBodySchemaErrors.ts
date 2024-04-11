import type { ValidationError } from 'elysia';

import type { DTO, FormErrors } from '../../types';

export function getBodySchemaErrors<T extends DTO>(error: Readonly<ValidationError>, dto: T): FormErrors<T> {
  return Object.keys(dto.properties).reduce((acc, key) => {
    const fieldName = key as keyof T;
    const errorMsg = error.all.find(({ path }) => path === `/${String(fieldName)}`)?.schema.error;

    if (typeof errorMsg !== 'string') return acc;

    return { ...acc, [fieldName]: errorMsg };
  }, {} as FormErrors<T>);
}
