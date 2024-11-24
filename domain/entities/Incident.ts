export class Incident {
    constructor(
      public incidentId: string,
      public essaiId: string,
      public typeIncident: string,
      public description: string,
      public dateIncident: Date,
      public gravite: string
    ) {}
  }