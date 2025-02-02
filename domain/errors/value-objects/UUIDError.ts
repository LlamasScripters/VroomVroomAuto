import { ValueObjectError } from '../ValueObjectError';

export class UUIDError extends ValueObjectError {
  constructor(uuid: string) {
    super(`Invalid UUID: ${uuid}`);
  }
}
