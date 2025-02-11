import { Reparation } from '@domain/entities/ReparationEntity';
import { UUID } from '@domain/value-objects/UUID';

export interface ReparationRepository {
  save(reparation: Reparation): Promise<Reparation>;
  findById(reparationId: UUID): Promise<Reparation | null>;
  delete(reparationId: UUID): Promise<boolean>;
  findAll(): Promise<Reparation[]>;
  update(reparation: Reparation): Promise<Reparation>;
}
