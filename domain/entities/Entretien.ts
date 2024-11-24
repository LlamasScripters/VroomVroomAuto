export class Entretien {
    constructor(
      public entretienId: string,
      public motoId: string,
      public typeEntretien: string,
      public datePrevue: Date,
      public dateRealisee: Date,
      public kilometrageEntretien: number,
      public recommandationsTechnicien: string,
      public recommandationsGestionnaireClient: string,
      public cout: number,
      public statut: string,
      public userId: string
    ) {}
  }