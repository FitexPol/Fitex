import { t } from 'elysia';

import type { Form, TextValidators } from '../../types';

type SchemaTextField = ReturnType<typeof t.String> | ReturnType<typeof t.RegExp>;

type SchemaObject<T extends Form> = {
  [K in keyof T]: SchemaTextField;
};

type Schema<T extends Form> = ReturnType<typeof t.Object<SchemaObject<T>>>;

export function getBodySchema<T extends Form>(form: Form): Schema<T> {
  const schemaObject: SchemaObject<T> = Object.entries(form).reduce((acc, [key, control]) => {
    if (Array.isArray(control) || control.type === 'number') return { ...acc, [key]: t.String() };

    return { ...acc, [key]: getSchemaTextField(control.validators) };
  }, {} as SchemaObject<T>);

  return t.Object(schemaObject);
}

function getSchemaTextField(validators?: TextValidators): SchemaTextField {
  if (!validators) return t.String();

  const error: string = validators.message;

  if (validators.regex) return t.RegExp(validators.regex, { error });

  return t.String({
    minLength: validators.minLength,
    maxLength: validators.maxLength,
    error,
  });
}
