import { UUID } from '../value-objects/UUID';

export class Moto {
    constructor(
      public readonly motoId: UUID,
      public readonly marque: string,
      public readonly model: string,
      public readonly kilometrage: number,
      public readonly dateMiseEnService: Date,
      public readonly statut: string,
      public readonly serialNumber: string,
      public readonly userId: UUID
    ) {}

    public static create(
      motoId: UUID,
      marque: string,
      model: string,
      kilometrage: number,
      dateMiseEnService: Date,
      statut: string,
      serialNumber: string,
      userId: UUID
    ): Moto {
      return new Moto(motoId, marque, model, kilometrage, dateMiseEnService, statut, serialNumber, userId);
    }

  }