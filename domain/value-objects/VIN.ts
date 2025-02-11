// domain/value-objects/VIN.ts
export class VIN {
    private readonly value: string;

    constructor(vin: string) {
        const formattedVIN = vin.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '');
        
        if (!this.isValid(formattedVIN)) {
            throw new Error('Le numéro VIN doit commencer par SMT et contenir 17 caractères alphanumériques.');
        }
        
        this.value = formattedVIN;
    }

    private isValid(vin: string): boolean {
        if (vin.length !== 17) {
            return false;
        }

        const triumphVINPattern = /^SMT[A-HJ-NPR-Z0-9]{14}$/;
        return triumphVINPattern.test(vin);
    }

    toString(): string {
        return this.value;
    }
}