import { Incident } from '../../../domain/entities/IncidentEntity';
import { IncidentRepository } from '../../repositories/IncidentRepository';
import { UUID } from '../../../domain/value-objects/UUID';

interface IncidentData {  
  incidentId: UUID;
  essaiId: UUID;
  typeIncident: string;
  description: string;
  dateIncident: Date;
  gravite: string;
}

export class IncidentUseCases {
  constructor(private incidentRepository: IncidentRepository) {}

  async createIncident(essaiId: UUID, typeIncident: string, description: string, dateIncident: Date, gravite: string): Promise<Incident> {
    const incident = Incident.create(new UUID(), essaiId, typeIncident, description, dateIncident, gravite);
    return this.incidentRepository.save(incident);
  }

  async getIncidentById(incidentId: UUID): Promise<Incident | null> {
    return this.incidentRepository.findById(incidentId);
  }

  async updateIncident(incidentId: UUID, updatedData: Partial<IncidentData>): Promise<Incident | null> {
    const incident = await this.incidentRepository.findById(incidentId);
    if (!incident) return null;

    const updatedIncident = Incident.create(
      incident.incidentId,
      updatedData.essaiId || incident.essaiId,
      updatedData.typeIncident || incident.typeIncident,
      updatedData.description || incident.description,
      updatedData.dateIncident || incident.dateIncident,
      updatedData.gravite || incident.gravite
    );
    
    return this.incidentRepository.save(updatedIncident);
  }

  async deleteIncident(incidentId: UUID): Promise<boolean> {
    return this.incidentRepository.delete(incidentId);
  }
}
