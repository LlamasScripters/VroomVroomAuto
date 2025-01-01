import { Incident } from '../../domain/entities/IncidentEntity';
import { IncidentRepository } from '../repositories/IncidentRepository';
import { UUID } from '../../domain/value-objects/UUID';

export class IncidentUseCases {
  constructor(private incidentRepository: IncidentRepository) {}

  async createIncident(incidentId: UUID, essaiId: UUID, typeIncident: string, description: string, dateIncident: Date, gravite: string): Promise<Incident> {
    const incident = Incident.create(incidentId, essaiId, typeIncident, description, dateIncident, gravite);
    return this.incidentRepository.save(incident);
  }

  async getIncidentById(incidentId: UUID): Promise<Incident | null> {
    return this.incidentRepository.findById(incidentId);
  }

  async updateIncident(incidentId: UUID, updatedData: Partial<Incident>): Promise<Incident | null> {
    const incident = await this.incidentRepository.findById(incidentId);
    if (!incident) return null;
    
    return this.incidentRepository.save(incident);
  }

  async deleteIncident(incidentId: UUID): Promise<boolean> {
    return this.incidentRepository.delete(incidentId);
  }
}
