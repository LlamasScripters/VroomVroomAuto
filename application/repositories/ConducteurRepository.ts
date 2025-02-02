import { Conducteur } from "../../domain/entities/ConducteurEntity";
import { UUID } from "../../domain/value-objects/UUID";

export interface ConducteurRepository {
  save(conducteur: Conducteur): Promise<Conducteur>;
  findById(conducteurId: UUID): Promise<Conducteur | null>;
  delete(conducteurId: UUID): Promise<boolean>;
  findAll(): Promise<Conducteur[]>;
  update(conducteur: Conducteur): Promise<Conducteur>;
}