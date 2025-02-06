import { Incident } from '../../../domain/entities/IncidentEntity';
import { IncidentRepository } from '../../repositories/IncidentRepository';
import { UUID } from '../../../domain/value-objects/UUID';
import { IncidentDTO, createIncidentDTO, updateIncidentDTO, deleteIncidentDTO, getIncidentDTO,  } from '@application/dtos/IncidentDTO';
import { IncidentResponse } from '@application/response/IncidentResponse';
export class IncidentUseCases {
  constructor(
    private incidentRepository: IncidentRepository
  ) {}

  async createIncident(incidentData: createIncidentDTO ): Promise<IncidentResponse> {
    const incident = Incident.create(
      new UUID(),
      new UUID(incidentData.essaiId), 
      incidentData.typeIncident, 
      incidentData.description, 
      new Date(incidentData.dateIncident), 
      incidentData.gravite
    );
    try {
      const savedIncident = await this.incidentRepository.save(incident);
      return { incidentId: savedIncident.incidentId.toString() };
    } catch (error) {
      throw error;
    }
  }

  async getIncidentById(incidentData: getIncidentDTO): Promise<Incident | null> {
    const incidentIdentifier = new UUID(incidentData.incidentId);
    return this.incidentRepository.findById(incidentIdentifier);
  }

  async updateIncident(incidentData: updateIncidentDTO): Promise<Incident | null> {
    const incidentIdentifier = new UUID(incidentData.incidentId);
    const incident = await this.incidentRepository.findById(incidentIdentifier);
    if (!incident) return null;

    const updatedIncident = Incident.create(
      incident.incidentId,
      incidentData.essaiId ? new UUID(incidentData.essaiId) : incident.essaiId,
      incidentData.typeIncident || incident.typeIncident,
      incidentData.description || incident.description,
      incidentData.dateIncident ? new Date(incidentData.dateIncident) : incident.dateIncident,
      incidentData.gravite || incident.gravite
    );
    
    return this.incidentRepository.save(updatedIncident);
  }

  async deleteIncident(incidentData: deleteIncidentDTO): Promise<boolean> {
    const incidentIdentifier = new UUID(incidentData.incidentId);
    return this.incidentRepository.delete(incidentIdentifier);
  }
}
