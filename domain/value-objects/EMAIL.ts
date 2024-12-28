import { EmailError } from '../errors/value-objects/EmailError';

export class Email {
  private readonly value: string;

  constructor(value: string) {
    if (!this.validateEmail(value)) {
      throw new EmailError(value);
    }
    this.value = value;
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: Email): boolean {
    return this.value === other.toString();
  }
}
