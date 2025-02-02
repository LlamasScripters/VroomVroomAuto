// application/use-cases/piece/PieceCrudUseCases.ts
import { Piece } from '@domain/entities/PieceEntity';
import { PieceRepository } from '@application/repositories/PieceRepository';
import { UUID } from '@domain/value-objects/UUID';
import { CreatePieceDTO, UpdatePieceDTO } from '@application/dtos/PieceDTO';

export class PieceCrudUseCases {
  constructor(private pieceRepository: PieceRepository) {}

  async createPiece(pieceData: CreatePieceDTO): Promise<Piece> {
    const piece = Piece.create(
      new UUID(),
      pieceData.nom,
      pieceData.reference,
      pieceData.quantiteEnStock,
      pieceData.seuilCritique,
      pieceData.categorie,
      pieceData.fournisseur,
      pieceData.prixUnitaire
    );

    return await this.pieceRepository.save(piece);
  }

  async getPieceById(pieceId: string): Promise<Piece | null> {
    return await this.pieceRepository.findById(new UUID(pieceId));
  }

  async updatePiece(updatedData: UpdatePieceDTO): Promise<Piece | null> {
    const existingPiece = await this.pieceRepository.findById(new UUID(updatedData.pieceId));
    if (!existingPiece) return null;

    const updatedPiece = Piece.create(
      existingPiece.pieceId,
      updatedData.nom ?? existingPiece.nom,
      updatedData.reference ?? existingPiece.reference,
      updatedData.quantiteEnStock ?? existingPiece.quantiteEnStock,
      updatedData.seuilCritique ?? existingPiece.seuilCritique,
      updatedData.categorie ?? existingPiece.categorie,
      updatedData.fournisseur ?? existingPiece.fournisseur,
      updatedData.prixUnitaire ?? existingPiece.prixUnitaire
    );

    return await this.pieceRepository.update(updatedPiece);
  }

  async deletePiece(pieceId: string): Promise<boolean> {
    return await this.pieceRepository.delete(new UUID(pieceId));
  }

  async getAllPieces(): Promise<Piece[]> {
    return await this.pieceRepository.findAll();
  }

  async updateStock(pieceId: string, quantite: number): Promise<Piece | null> {
    return await this.pieceRepository.updateStock(new UUID(pieceId), quantite);
  }

  async getPiecesCritiques(): Promise<Piece[]> {
    return await this.pieceRepository.findByCriticalStock();
  }
}