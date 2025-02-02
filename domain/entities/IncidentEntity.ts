import { UUID } from '../value-objects/UUID';

export class Incident {
    constructor(
      public readonly incidentId: UUID,
      public readonly essaiId: UUID,
      public readonly typeIncident: string,
      public readonly description: string,
      public readonly dateIncident: Date,
      public readonly gravite: string
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

  }