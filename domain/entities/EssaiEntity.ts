import { UUID } from '@domain/value-objects/UUID';

export class Essai {
    constructor(
      public readonly essaiId: UUID,
      public readonly motoId: UUID,
      public readonly conducteurId: UUID,
      public readonly dateDebut: Date,
      public readonly dateFin: Date,
      public readonly duree: number,
      public readonly userId: UUID
    ) {}

    public static create(
      essaiId: UUID,
      motoId: UUID,
      conducteurId: UUID,
      dateDebut: Date,
      dateFin: Date,
      duree: number,
      userId: UUID
    ): Essai {
      return new Essai(essaiId, motoId, conducteurId, dateDebut, dateFin, duree, userId);
    }
    
  }