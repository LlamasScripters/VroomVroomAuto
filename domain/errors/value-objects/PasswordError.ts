import { ValueObjectError } from '@domain/errors/ValueObjectError';

export class PasswordError extends ValueObjectError {
  constructor() {
    super(
      "Invalid password. Password must be at least 12 characters long, include uppercase and lowercase letters, a number, and a special character."
    );
  }
}
