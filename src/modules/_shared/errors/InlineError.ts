import type { DTO, FormErrors } from '../types';

export type InlineErrorDetails<T extends DTO> = {
  status: number;
  message: string;
  field: keyof FormErrors<T>;
};

export class InlineError<T extends DTO> extends Error {
  constructor(errorDetails: InlineErrorDetails<T>) {
    super(JSON.stringify(errorDetails));
  }
}
