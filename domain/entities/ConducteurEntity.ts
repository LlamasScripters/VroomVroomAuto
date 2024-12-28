import { UUID } from '../value-objects/UUID';

export class Conducteur {
    constructor(
      private readonly conducteurId: UUID,
      private readonly nom: string,
      private readonly permis: string,
      private readonly categoriePermis: string,
      private readonly experience: number,
      private readonly userId: UUID
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

    public getNom(): string {
      return this.nom;
    }

    public getPermis(): string {
      return this.permis;
    }

    public getCategoriePermis(): string {
      return this.categoriePermis;
    }

    public getExperience(): number {
      return this.experience;
    }

    public getUserId(): UUID {
      return this.userId;
    }

    public getConducteurId(): UUID {
      return this.conducteurId;
    }
  }