// application/repositories/EntretienPieceRepository.ts
import { EntretienPiece } from '@domain/entities/EntretienPieceEntity';
import { UUID } from '@domain/value-objects/UUID';

export interface EntretienPieceRepository {
  save(entretienPiece: EntretienPiece): Promise<EntretienPiece>;
  findByEntretienId(entretienId: UUID): Promise<EntretienPiece[]>;
  delete(entretienPieceId: UUID): Promise<boolean>;
}