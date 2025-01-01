import { Essai } from '../../domain/entities/EssaiEntity';
import { UUID } from '../../domain/value-objects/UUID';

export interface EssaiRepository {
  save(essai: Essai): Promise<Essai>;
  findById(essaiId: UUID): Promise<Essai | null>;
  delete(essaiId: UUID): Promise<boolean>;
  findAll(): Promise<Essai[]>;
  update(essai: Essai): Promise<Essai>;
}
