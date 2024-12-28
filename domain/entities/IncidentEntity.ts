import { UUID } from '../value-objects/UUID';

export class Incident {
    constructor(
      private readonly incidentId: UUID,
      private readonly essaiId: UUID,
      private readonly typeIncident: string,
      private readonly description: string,
      private readonly dateIncident: Date,
      private readonly gravite: string
    ) {}
    public static create(
      incidentId: UUID,
      essaiId: UUID,
      typeIncident: string,
      description: string,
      dateIncident: Date,
      gravite: string
    ): Incident {
      return new Incident(incidentId, essaiId, typeIncident, description, dateIncident, gravite);
    }

    public getEssaiId(): UUID {
      return this.essaiId;
    }

    public getTypeIncident(): string {
      return this.typeIncident;
    }

    public getDescription(): string {
      return this.description;
    }

    public getDateIncident(): Date {
      return this.dateIncident;
    }

    public getGravite(): string {
      return this.gravite;
    }

    public getIncidentId(): UUID {
      return this.incidentId;
    }
  }