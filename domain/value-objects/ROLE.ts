export class Role {
    private readonly value: 'admin' | 'user' | 'gestionnaire';

    constructor(value: 'admin' | 'user' | 'gestionnaire') {
        this.value = value;
    }

    public toString(): string {
        return this.value;
    }

    public equals(other: Role): boolean {
        return this.value === other.toString();
    }
}