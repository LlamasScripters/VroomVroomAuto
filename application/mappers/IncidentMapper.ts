import { Incident } from "@domain/entities/IncidentEntity";
import { UUID } from "@domain/value-objects/UUID";
import { IncidentDTO } from "@application/dtos/IncidentDTO";

export function toDTO (incident: Incident): IncidentDTO {
  return {
    incidentId: incident.incidentId.toString(),
    essaiId: incident.essaiId.toString(),
    typeIncident: incident.typeIncident,
    description: incident.description,
    dateIncident: incident.dateIncident.toISOString(),
    gravite: incident.gravite
  };
}

export function toDomain (dto: IncidentDTO): Incident {
  return Incident.create(
    new UUID(dto.incidentId),
    new UUID(dto.essaiId),
    dto.typeIncident,
    dto.description,
    new Date(dto.dateIncident),
    dto.gravite
  );
}