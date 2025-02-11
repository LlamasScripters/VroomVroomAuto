import { Panne } from '@domain/entities/PanneEntity';
import { UUID } from '@domain/value-objects/UUID';

export interface PanneRepository {
  save(panne: Panne): Promise<Panne>;
  findById(panneId: UUID): Promise<Panne | null>;
  delete(panneId: UUID): Promise<boolean>;
  findAll(): Promise<Panne[]>;
  update(panne: Panne): Promise<Panne>;
}
