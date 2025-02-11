import { UUID } from '@domain/value-objects/UUID';

interface UserInfo {
  userId: string;
  username: string;
  email: string;
}

export class Moto {
    constructor(
      public readonly motoId: UUID,
      public readonly marque: string,
      public readonly model: string,
      public readonly kilometrage: number,
      public readonly dateMiseEnService: Date,
      public readonly statut: string,
      public readonly serialNumber: string,
      public readonly userId: UUID,
      public readonly user?: UserInfo | null
    ) {}

    public static create(
      motoId: UUID,
      marque: string,
      model: string,
      kilometrage: number,
      dateMiseEnService: Date,
      statut: string,
      serialNumber: string,
      userId: UUID,
      user?: UserInfo | null
    ): Moto {
      return new Moto(motoId, marque, model, kilometrage, dateMiseEnService, statut, serialNumber, userId, user);
    }

  }