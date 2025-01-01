import { Piece } from '../../domain/entities/PieceEntity';
import { UUID } from '../../domain/value-objects/UUID';

export interface PieceRepository {
  save(piece: Piece): Promise<Piece>;
  findById(pieceId: UUID): Promise<Piece | null>;
  delete(pieceId: UUID): Promise<boolean>;
  findAll(): Promise<Piece[]>;
  update(piece: Piece): Promise<Piece>;
}
