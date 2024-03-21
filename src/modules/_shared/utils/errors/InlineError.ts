import type { Form, FormErrors } from '../../types';

export type InlineErrorDetails<T extends Form> = {
  status: number;
  message: string;
  field: keyof FormErrors<T>;
};

export class InlineError<T extends Form> extends Error {
  constructor(errorDetails: InlineErrorDetails<T>) {
    super(JSON.stringify(errorDetails));
  }
}
