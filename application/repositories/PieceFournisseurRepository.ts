// application/repositories/PieceFournisseurRepository.ts
import { PieceFournisseur } from '@domain/entities/PieceFournisseurEntity';
import { UUID } from '@domain/value-objects/UUID';

export interface PieceFournisseurRepository {
    save(piece: PieceFournisseur): Promise<PieceFournisseur>;
    findById(pieceId: UUID): Promise<PieceFournisseur | null>;
    findAll(): Promise<PieceFournisseur[]>;
    update(piece: PieceFournisseur): Promise<PieceFournisseur>;
    delete(pieceId: UUID): Promise<boolean>;
    updateStock(pieceId: UUID, quantite: number, type: 'AJOUT' | 'RETRAIT'): Promise<PieceFournisseur>;
    findByCategorie(categorie: string): Promise<PieceFournisseur[]>;
    findByCriticalStock(): Promise<PieceFournisseur[]>;
    searchPieces(query: string): Promise<PieceFournisseur[]>;
}