export class Moto {
    constructor(
      public motoId: string,
      public marque: string,
      public modele: string,
      public kilometrage: number,
      public dateMiseEnService: Date,
      public statut: string,
      public clientId: string
    ) {}
  }