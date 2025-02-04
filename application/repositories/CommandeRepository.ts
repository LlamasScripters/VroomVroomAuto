// application/repositories/CommandeRepository.ts
import { Commande } from '@domain/entities/CommandeEntity';
import { UUID } from '@domain/value-objects/UUID';

export interface CommandeRepository {
  save(commande: Commande): Promise<Commande>;
  findById(commandeId: UUID): Promise<Commande | null>;
  findAll(): Promise<Commande[]>;
  update(commande: Commande): Promise<Commande>;
  delete(commandeId: UUID): Promise<boolean>;
  findByPieceId(pieceId: UUID): Promise<Commande[]>;
}