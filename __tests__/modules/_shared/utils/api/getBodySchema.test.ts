// eslint-disable-next-line import/no-unresolved
import { describe, expect, it } from 'bun:test';

import { type Form } from '@types';
import { getBodySchema } from '@utils/api/getBodySchema';

describe('getBodySchema', () => {
  const form = {
    requiredTextField: {
      name: 'requiredTextField',
      type: 'text',
      validators: {
        maxLength: 100,
        minLength: 3,
        message: 'This field is required',
        required: true,
      },
    },
    optionalTextField: {
      name: 'optionalTextField',
      type: 'text',
    },
    requiredNumberField: {
      name: 'requiredNumberField',
      type: 'number',
      validators: {
        message: 'This field is required',
        required: true,
      },
    },
    optionalNumberField: {
      name: 'optionalNumberField',
      type: 'number',
    },
    requiredPasswordField: {
      name: 'requiredPasswordField',
      type: 'password',
      validators: {
        maxLength: 100,
        minLength: 3,
        message: 'This field is required',
        required: true,
      },
    },
    optionalPasswordField: {
      name: 'optionalPasswordField',
      type: 'password',
    },
    requiredSearchField: {
      name: 'requiredSearchField',
      type: 'search',
      validators: {
        maxLength: 100,
        minLength: 3,
        message: 'This field is required',
        required: true,
      },
    },
    optionalSearchField: {
      name: 'optionalSearchField',
      type: 'search',
    },
  } satisfies Form;

  it('should return an appropriate schema for the given form', () => {
    const { properties, required } = getBodySchema<typeof form>(form);

    expect(properties.requiredTextField.type).toBe('string');
    expect(properties.requiredTextField.maxLength).toBe(100);
    expect(properties.requiredTextField.minLength).toBe(3);
    expect(properties.requiredTextField.error).toBe('This field is required');
    expect(properties.optionalTextField.type).toBe('string');

    expect(properties.requiredNumberField.type).toBe('string');
    expect(properties.requiredNumberField.error).toBe('This field is required');
    expect(properties.optionalTextField.type).toBe('string');

    expect(properties.requiredPasswordField.type).toBe('string');
    expect(properties.requiredPasswordField.maxLength).toBe(100);
    expect(properties.requiredPasswordField.minLength).toBe(3);
    expect(properties.requiredPasswordField.error).toBe('This field is required');
    expect(properties.optionalPasswordField.type).toBe('string');

    expect(properties.requiredSearchField.type).toBe('string');
    expect(properties.requiredSearchField.maxLength).toBe(100);
    expect(properties.requiredSearchField.minLength).toBe(3);
    expect(properties.requiredSearchField.error).toBe('This field is required');
    expect(properties.optionalSearchField.type).toBe('string');

    expect(required).toEqual([
      'requiredTextField',
      'requiredNumberField',
      'requiredPasswordField',
      'requiredSearchField',
    ]);
  });
});
