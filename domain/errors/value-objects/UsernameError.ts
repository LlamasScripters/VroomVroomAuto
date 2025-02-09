import { ValueObjectError } from '@domain/errors/ValueObjectError';

export class UsernameError extends ValueObjectError {
    constructor(value: string) {
        super(
        `Invalid username: ${value}. Username must be between 5 and 20 characters long.`
        );
    }
}