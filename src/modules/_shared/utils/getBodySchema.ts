import { t } from 'elysia';

import type { Form, NumberValidators, TextValidators } from '../types';

type SchemaTextField = ReturnType<typeof t.String> | ReturnType<typeof t.RegExp>;
type SchemaNumberField = ReturnType<typeof t.Number>;

type SchemaObject<T extends Form> = {
  [K in keyof T]: T[K] extends { type: 'number' } ? SchemaNumberField : SchemaTextField;
};

type Schema<T extends Form> = ReturnType<typeof t.Object<SchemaObject<T>>>;

export function getBodySchema<T extends Form>(form: Form): Schema<T> {
  const schemaObject: SchemaObject<T> = Object.entries(form).reduce((acc, [key, control]) => {
    let schemaField: SchemaNumberField | SchemaTextField;

    if (Array.isArray(control)) {
      schemaField = t.String();
      return { ...acc, [key]: schemaField };
    }

    switch (control.type) {
      case 'number':
        schemaField = getSchemaNumberField(control.validators);
        break;
      default:
        schemaField = getSchemaTextField(control.validators);
    }

    return { ...acc, [key]: schemaField };
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

function getSchemaNumberField(validators?: NumberValidators): SchemaNumberField {
  if (!validators) return t.Number();

  return t.Number({
    minimum: validators.min,
    maximum: validators.max,
    error: validators.message,
  });
}
