import { UUID } from '../value-objects/UUID';

export class Moto {
    constructor(
      public readonly motoId: UUID,
      public readonly marque: string,
      public readonly modele: string,
      public readonly kilometrage: number,
      public readonly dateMiseEnService: Date,
      public readonly statut: string,
      public readonly clientId: UUID
    ) {}

    public static create(
      motoId: UUID,
      marque: string,
      modele: string,
      kilometrage: number,
      dateMiseEnService: Date,
      statut: string,
      clientId: UUID
    ): Moto {
      return new Moto(motoId, marque, modele, kilometrage, dateMiseEnService, statut, clientId);
    }

  }