export class Role {
    private readonly value: 'ADMIN' | 'USER';

    constructor(value: 'ADMIN' | 'USER') {
        this.value = value;
    }

    public toString(): string {
        return this.value;
    }

    public equals(other: Role): boolean {
        return this.value === other.toString();
    }
}