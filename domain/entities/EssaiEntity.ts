import { UUID } from '../value-objects/UUID';

export class Essai {
    constructor(
      public readonly essaiId: UUID,
      public readonly motoId: UUID,
      public readonly ConducteurId: UUID,
      public readonly dateDebut: Date,
      public readonly dateFin: Date,
      public readonly duree: number,
      public readonly userId: UUID
    ) {}

    public static create(
      essaiId: UUID,
      motoId: UUID,
      ConducteurId: UUID,
      dateDebut: Date,
      dateFin: Date,
      duree: number,
      userId: UUID
    ): Essai {
      return new Essai(essaiId, motoId, ConducteurId, dateDebut, dateFin, duree, userId);
    }
    
  }