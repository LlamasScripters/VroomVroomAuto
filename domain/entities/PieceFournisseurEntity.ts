// domain/entities/PieceFournisseurEntity.ts
import { UUID } from '@domain/value-objects/UUID';

export type PieceCategorie = 'Filtration' | 'Freinage' | 'Pneumatiques' | 'Moteur' | 'Transmission' | 'Electrique' | 'Carrosserie' | 'Autres';

export class PieceFournisseur {
    constructor(
        public readonly pieceId: UUID,
        public readonly reference: string,
        public readonly nom: string,
        public readonly description: string,
        public readonly categorie: PieceCategorie,
        public readonly prixUnitaire: number,
        public readonly quantiteEnStock: number,
        public readonly seuilCritique: number,
        public readonly fournisseur: string = 'Triumph Motorcycles'
    ) {
        this.validatePieceFournisseur();
    }

    private validatePieceFournisseur(): void {
        if (this.quantiteEnStock < 0) {
            throw new Error('La quantité en stock ne peut pas être négative');
        }
        if (this.prixUnitaire <= 0) {
            throw new Error('Le prix unitaire doit être supérieur à 0');
        }
        if (this.seuilCritique < 0) {
            throw new Error('Le seuil critique ne peut pas être négatif');
        }
    }

    public isStockCritique(): boolean {
        return this.quantiteEnStock <= this.seuilCritique;
    }

    public isDisponible(): boolean {
        return this.quantiteEnStock > 0;
    }

    public hasStockSuffisant(quantiteDemandee: number): boolean {
        return this.quantiteEnStock >= quantiteDemandee;
    }

    public static create(
        pieceId: UUID,
        reference: string,
        nom: string,
        description: string,
        categorie: PieceCategorie,
        prixUnitaire: number,
        quantiteEnStock: number,
        seuilCritique: number,
        fournisseur: string = 'Triumph Motorcycles'
    ): PieceFournisseur {
        return new PieceFournisseur(
            pieceId,
            reference,
            nom,
            description,
            categorie,
            prixUnitaire,
            quantiteEnStock,
            seuilCritique,
            fournisseur
        );
    }
}