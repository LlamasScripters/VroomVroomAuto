import { ValueObjectError } from '@domain/errors/ValueObjectError';

export class UUIDError extends ValueObjectError {
  constructor(uuid: string) {
    super(`Invalid UUID: ${uuid}`);
  }
}
