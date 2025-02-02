import { Moto } from '@domain/entities/MotoEntity';
import { UUID } from '@domain/value-objects/UUID';

export interface MotoRepository {
  save(moto: Moto): Promise<Moto>;
  findById(motoId: UUID): Promise<Moto | null>;
  delete(motoId: UUID): Promise<boolean>;
  findAll(): Promise<Moto[]>;
  update(moto: Moto): Promise<Moto>;
}
