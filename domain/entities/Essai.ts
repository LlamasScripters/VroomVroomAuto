export class Essai {
    constructor(
      public essaiId: string,
      public motoId: string,
      public ConducteurId: string,
      public dateDebut: Date,
      public dateFin: Date,
      public duree: number,
      public userId: string
    ) {}
  }