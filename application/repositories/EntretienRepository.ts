import { Entretien  } from "../../domain/entities/EntretienEntity";
import { UUID } from "../../domain/value-objects/UUID";

export interface EntretienRepository {
  save(entretien: Entretien): Promise<Entretien>;
  findById(entretienId: UUID): Promise<Entretien | null>;
  delete(entretienId: UUID): Promise<boolean>;
  findAll(): Promise<Entretien[]>;
  update(entretien: Entretien): Promise<Entretien>;
}