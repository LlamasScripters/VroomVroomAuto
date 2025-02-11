import { UsernameError } from '@domain/errors/value-objects/UsernameError';

export class Username {
    private readonly value: string;
//  constructeur privée pour empêcher la création d'instance de Username en dehors de la méthode Factory
    constructor(value: string) {
        if (value.length < 5 || value.length > 20) {
            throw new UsernameError(value);
        }
        this.value = value;
    }

    public toString(): string {
        return this.value;
    }

    public equals(other: Username): boolean {
        return this.value === other.toString();
    }
}