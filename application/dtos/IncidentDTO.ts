import { Incident } from "../../domain/entities/IncidentEntity";

export interface createIncidentDTO {
    essaiId: string;
    typeIncident: string;
    description: string;
    dateIncident: string;
    gravite: string;
}

export interface updateIncidentDTO {
    incidentId: string;
    essaiId?: string;
    typeIncident?: string;
    description?: string;
    dateIncident?: string;
    gravite?: string;
}

export interface deleteIncidentDTO {
    incidentId: string;
}

export interface getIncidentDTO {
    incidentId: string;
}

export interface IncidentDTO {
    incidentId: string;
    essaiId: string;
    typeIncident: string;
    description: string;
    dateIncident: string;
    gravite: string;
}
