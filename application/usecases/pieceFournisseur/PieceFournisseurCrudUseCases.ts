// application/usecases/pieceFournisseur/PieceFournisseurCrudUseCases.ts
import { PieceFournisseur, PieceCategorie } from '@domain/entities/PieceFournisseurEntity';
import { PieceFournisseurRepository } from '@application/repositories/PieceFournisseurRepository';
import { UUID } from '@domain/value-objects/UUID';

export class PieceFournisseurCrudUseCases {
    constructor(private pieceFournisseurRepository: PieceFournisseurRepository) {}

    async createPieceFournisseur(pieceData: {
        reference: string;
        nom: string;
        description: string;
        categorie: PieceCategorie;
        prixUnitaire: number;
        quantiteEnStock: number;
        seuilCritique: number;
    }): Promise<PieceFournisseur> {
        const piece = PieceFournisseur.create(
            new UUID(),
            pieceData.reference,
            pieceData.nom,
            pieceData.description,
            pieceData.categorie,
            pieceData.prixUnitaire,
            pieceData.quantiteEnStock,
            pieceData.seuilCritique
        );

        return await this.pieceFournisseurRepository.save(piece);
    }

    async getPieceFournisseurById(pieceId: string): Promise<PieceFournisseur | null> {
        return await this.pieceFournisseurRepository.findById(new UUID(pieceId));
    }

    async getAllPiecesFournisseur(): Promise<PieceFournisseur[]> {
        return await this.pieceFournisseurRepository.findAll();
    }

    async getPiecesFournisseurByCategorie(categorie: string): Promise<PieceFournisseur[]> {
        return await this.pieceFournisseurRepository.findByCategorie(categorie);
    }

    async updatePieceFournisseur(pieceId: string, updateData: Partial<PieceFournisseur>): Promise<PieceFournisseur> {
        const existingPiece = await this.pieceFournisseurRepository.findById(new UUID(pieceId));
        if (!existingPiece) {
            throw new Error('Pièce non trouvée');
        }

        const updatedPiece = PieceFournisseur.create(
            existingPiece.pieceId,
            updateData.reference || existingPiece.reference,
            updateData.nom || existingPiece.nom,
            updateData.description || existingPiece.description,
            updateData.categorie || existingPiece.categorie,
            updateData.prixUnitaire || existingPiece.prixUnitaire,
            updateData.quantiteEnStock || existingPiece.quantiteEnStock,
            updateData.seuilCritique || existingPiece.seuilCritique,
        );

        return await this.pieceFournisseurRepository.update(updatedPiece);
    }

    async deletePieceFournisseur(pieceId: string): Promise<boolean> {
        return await this.pieceFournisseurRepository.delete(new UUID(pieceId));
    }
}