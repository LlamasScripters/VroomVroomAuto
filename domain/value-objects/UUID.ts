import { UUIDError } from '@domain/errors/value-objects/UUIDError';
import { v6 as uuidv6, validate as uuidValidate } from 'uuid';

export class UUID {
  private readonly value: string;

  constructor(value?: string) {
    if (value && !uuidValidate(value)) {
      throw new UUIDError(value);
    }
    this.value = value || uuidv6();
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: UUID): boolean {
    return this.value === other.toString();
  }
}
