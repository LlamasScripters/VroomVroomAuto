import { PasswordError } from '../errors/value-objects/PasswordError';

export class Password {
  private readonly value: string;

  constructor(value: string) {
    if (!this.validatePassword(value)) {
      throw new PasswordError();
    }
    this.value = value;
  }

  private validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{12,}$/;
    return passwordRegex.test(password);
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: Password): boolean {
    return this.value === other.toString();
  }
}
