import { ValueObjectError } from '../ValueObjectError';

export class EmailError extends ValueObjectError {
  constructor(email: string) {
    super(`Invalid email address: ${email}`);
  }
}
