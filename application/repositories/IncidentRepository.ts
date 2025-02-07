// incidentRepository 
import { Incident } from '../../domain/entities/IncidentEntity';
import { UUID } from '../../domain/value-objects/UUID';

export interface IncidentRepository {
  save(incident: Incident): Promise<Incident>;
  findById(incidentId: UUID): Promise<Incident | null>;
  delete(incidentId: UUID): Promise<boolean>;
  findAll(): Promise<Incident[]>;
  update(incident: Incident): Promise<Incident>;
}
