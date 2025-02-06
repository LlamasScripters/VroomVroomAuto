// application/repositories/ConducteurRepository.ts
import { Conducteur } from "../../domain/entities/ConducteurEntity";
import { UUID } from "../../domain/value-objects/UUID";
import { DisponibiliteConducteur, StatutConducteur } from "../../domain/entities/ConducteurEntity";

export interface ConducteurRepository {
  save(conducteur: Conducteur): Promise<Conducteur>;
  findById(conducteurId: UUID): Promise<Conducteur | null>;
  findAll(): Promise<Conducteur[]>;
  update(conducteur: Conducteur): Promise<Conducteur>;
  delete(conducteurId: UUID): Promise<boolean>;
  findByGestionnaire(gestionnaireid: UUID): Promise<Conducteur[]>;
  findByDisponibilite(disponibilite: DisponibiliteConducteur): Promise<Conducteur[]>;
  findByStatut(statut: StatutConducteur): Promise<Conducteur[]>;
  findByUser(userId: UUID): Promise<Conducteur | null>;
}