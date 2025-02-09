// domain/entities/CommandeEntity.ts
import { UUID } from '@domain/value-objects/UUID';

export enum CommandeStatut {
    EN_ATTENTE = 'EN_ATTENTE',
    EN_COURS = 'EN_COURS',
    LIVREE = 'LIVREE',
    ANNULEE = 'ANNULEE'
}

export class Commande {
    constructor(
        public readonly commandeId: UUID,
        public readonly pieceId: UUID,
        public readonly gestionnaireid: UUID,
        public readonly quantiteCommandee: number,
        public readonly coutTotal: number,
        public readonly dateCommande: Date,
        public readonly dateLivraisonPrevue: Date,
        public readonly statut: CommandeStatut,
        public readonly pieceDetails?: {
            nom: string;
            reference: string;
            prixUnitaire: number;
            categorie: string;
            fournisseur: string;
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
        return this.dateLivraisonPrevue < new Date() && this.statut !== CommandeStatut.LIVREE;
    }

    public static create(
        commandeId: UUID,
        pieceId: UUID,
        gestionnaireid: UUID,
        quantiteCommandee: number,
        coutTotal: number,
        dateCommande: Date,
        dateLivraisonPrevue: Date,
        statut: CommandeStatut,
        pieceDetails?: {
            nom: string;
            reference: string;
            prixUnitaire: number;
            categorie: string;
            fournisseur: string;
        }
    ): Commande {
        return new Commande(
            commandeId,
            pieceId,
            gestionnaireid,
            quantiteCommandee,
            coutTotal,
            dateCommande,
            dateLivraisonPrevue,
            statut,
            pieceDetails
        );
    }
}