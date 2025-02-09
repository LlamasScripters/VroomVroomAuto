import { Essai } from '@domain/entities/EssaiEntity';
import { UUID } from '@domain/value-objects/UUID';

export interface EssaiMongoRepository {
  save(essai: Essai): Promise<Essai>;
  findById(essaiId: UUID): Promise<Essai | null>;
  findByConducteurId(conducteurId: UUID): Promise<Essai[]>;
  delete(essaiId: UUID): Promise<boolean>;
  findAll(): Promise<Essai[]>;
  update(essai: Essai): Promise<Essai>;
}
