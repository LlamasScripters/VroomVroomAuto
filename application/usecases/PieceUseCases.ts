import { Piece } from '../../domain/entities/PieceEntity';
import { PieceRepository } from '../repositories/PieceRepository';
import { UUID } from '../../domain/value-objects/UUID';

export class PieceUseCases {
  constructor(private pieceRepository: PieceRepository) {}

  async createPiece(pieceId: UUID, nom: string, reference: string, quantiteEnStock: number, seuilCritique: number, categorie: string): Promise<Piece> {
    const piece = Piece.create(pieceId, nom, reference, quantiteEnStock, seuilCritique, categorie);
    return this.pieceRepository.save(piece);
  }

  async getPieceById(pieceId: UUID): Promise<Piece | null> {
    return this.pieceRepository.findById(pieceId);
  }

  async updatePiece(pieceId: UUID, updatedData: Partial<Piece>): Promise<Piece | null> {
    const piece = await this.pieceRepository.findById(pieceId);
    if (!piece) return null;
    
    return this.pieceRepository.save(piece);
  }

  async deletePiece(pieceId: UUID): Promise<boolean> {
    return this.pieceRepository.delete(pieceId);
  }
}
