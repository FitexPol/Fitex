import { type TOptional } from '@sinclair/typebox/build/require/type/optional';
import { type TString } from '@sinclair/typebox/build/require/type/string';
import { t } from 'elysia';

import type { Form, FormControl, TextValidators, Validator } from '../../types';

type SchemaObject<T extends Form> = {
  [K in keyof T]: T[K] extends FormControl
    ? T[K]['validators'] extends Validator
      ? T[K]['validators']['required'] extends true
        ? TString
        : TOptional<TString>
      : TOptional<TString>
    : TOptional<TString>;
};

type Schema<T extends Form> = ReturnType<typeof t.Object<SchemaObject<T>>>;

export function getBodySchema<T extends Form>(form: Form): Schema<T> {
  const schemaObject: SchemaObject<T> = Object.entries(form).reduce((acc, [key, control]) => {
    if (control.type === 'number')
      return {
        ...acc,
        [key]: control.validators?.required
          ? t.String({ error: control.validators.message })
          : t.Optional(t.String()),
      };

    return {
      ...acc,
      [key]: control.validators?.required
        ? getSchemaTextField(control.validators)
        : t.Optional(getSchemaTextField(control.validators)),
    };
  }, {} as SchemaObject<T>);

  return t.Object(schemaObject);
}

function getSchemaTextField(validators?: TextValidators): TString {
  if (!validators) return t.String();

  return t.String({
    minLength: validators.minLength,
    maxLength: validators.maxLength,
    error: validators.message,
  });
}
