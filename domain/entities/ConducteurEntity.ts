import { UUID } from '../value-objects/UUID';

export class Conducteur {
    constructor(
      public readonly conducteurId: UUID,
      public readonly nom: string,
      public readonly permis: string,
      public readonly categoriePermis: string,
      public readonly experience: number,
      public readonly userId: UUID
    ) {}
    public static create(
      conducteurId: UUID,
      nom: string,
      permis: string,
      categoriePermis: string,
      experience: number,
      userId: UUID
    ): Conducteur {
      return new Conducteur(conducteurId, nom, permis, categoriePermis, experience, userId);
    }
  }