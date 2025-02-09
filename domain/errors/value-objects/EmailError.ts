import { ValueObjectError } from '@domain/errors/ValueObjectError';

export class EmailError extends ValueObjectError {
  constructor(email: string) {
    super(`Invalid email address: ${email}`);
  }
}
