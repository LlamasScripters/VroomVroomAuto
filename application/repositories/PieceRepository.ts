// application/repositories/PieceRepository.ts
import { Piece } from "@domain/entities/PieceEntity";
import { UUID } from "@domain/value-objects/UUID";

export interface PieceRepository {
  save(piece: Piece): Promise<Piece>;
  findById(pieceId: UUID): Promise<Piece | null>;
  findAll(): Promise<Piece[]>;
  update(piece: Piece): Promise<Piece>;
  delete(pieceId: UUID): Promise<boolean>;
  updateStock(pieceId: UUID, quantite: number, type: 'AJOUT' | 'RETRAIT'): Promise<Piece>;
  findByCriticalStock(): Promise<Piece[]>;
}