import { UUID } from '@domain/value-objects/UUID';

export class Garantie {
    constructor(
      public readonly garantieId: UUID,
      public readonly panneId: UUID,
      public readonly motoId: UUID,
      public readonly couverture: string,
      public readonly type: string,
      public readonly dateDebut: Date,
      public readonly dateFin: Date,
      public readonly statut: string
    ) {}

    public static create(
      garantieId: UUID,
      panneId: UUID,
      motoId: UUID,
      couverture: string,
      type: string,
      dateDebut: Date,
      dateFin: Date,
      statut: string
    ): Garantie {
      return new Garantie(garantieId, panneId, motoId, couverture, type, dateDebut, dateFin, statut);
    }
    
}