export class Conducteur {
    constructor(
      public conducteurId: string,
      public nom: string,
      public permis: string,
      public categoriePermis: string,
      public experience: number,
      public userId: string
    ) {}
  }