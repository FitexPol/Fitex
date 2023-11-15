import { t } from 'elysia';

import type { Form, NumberValidators, TextValidators } from '../types';

type SchemaTextField = ReturnType<typeof t.String>;
type SchemaNumberField = ReturnType<typeof t.Number>;

type SchemaObject<T extends Form> = {
  [K in keyof T]: T[K]['type'] extends 'number' ? SchemaNumberField : SchemaTextField;
};

type Schema<T extends Form> = ReturnType<typeof t.Object<SchemaObject<T>>>;

export default function getBodySchema<T extends Form>(form: Form): Schema<T> {
  const schemaObject: SchemaObject<T> = Object.entries(form).reduce((acc, [key, control]) => {
    let schemaField: SchemaNumberField | SchemaTextField;

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
  let options: Parameters<typeof t.String>[0] = {};

  if (validators) {
    options = {
      minLength: validators.minLength?.value,
      maxLength: validators.maxLength?.value,
      error: (type) => {
        switch (type) {
          case 'minLength':
            return validators.minLength?.message;
          case 'maxLength':
            return validators.maxLength?.message;
        }
      },
    };
  }

  return t.String(options);
}

function getSchemaNumberField(validators?: NumberValidators): SchemaNumberField {
  let options: Parameters<typeof t.Number>[0] = {};

  if (validators) {
    options = {
      minimum: validators.min?.value,
      maximum: validators.max?.value,
      error: (type) => {
        switch (type) {
          case 'minimum':
            return validators.min?.message;
          case 'maximum':
            return validators.max?.message;
        }
      },
    };
  }

  return t.Number(options);
}
