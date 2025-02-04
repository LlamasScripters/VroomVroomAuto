// domain/entities/CommandeEntity.ts
import { UUID } from '../value-objects/UUID';

export class Commande {
    constructor(
        public readonly commandeId: UUID,
        public readonly pieceId: UUID,
        public readonly quantiteCommandee: number,
        public readonly coutTotal: number,
        public readonly dateCommande: Date,
        public readonly dateLivraisonPrevue: Date,
        public readonly statut: string,
        public readonly userId: UUID,
        public readonly pieceDetails?: {
            nom: string;
            reference: string;
            prixUnitaire: number;
        }
    ) {
        this.validateCommande();
    }

    private validateCommande(): void {
        if (this.quantiteCommandee <= 0) {
            throw new Error('La quantité commandée doit être supérieure à 0');
        }
        if (this.coutTotal < 0) {
            throw new Error('Le coût total ne peut pas être négatif');
        }
    }

    public isEnRetard(): boolean {
        return this.dateLivraisonPrevue < new Date() && this.statut !== 'LIVREE';
    }

    public static create(
        commandeId: UUID,
        pieceId: UUID,
        quantiteCommandee: number,
        coutTotal: number,
        dateCommande: Date,
        dateLivraisonPrevue: Date,
        statut: string,
        userId: UUID,
        pieceDetails?: {
            nom: string;
            reference: string;
            prixUnitaire: number;
        }
    ): Commande {
        return new Commande(
            commandeId,
            pieceId,
            quantiteCommandee,
            coutTotal,
            dateCommande,
            dateLivraisonPrevue,
            statut,
            userId,
            pieceDetails
        );
    }
}