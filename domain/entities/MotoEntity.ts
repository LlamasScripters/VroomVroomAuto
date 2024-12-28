import { UUID } from '../value-objects/UUID';

export class Moto {
    constructor(
      private readonly motoId: UUID,
      private readonly marque: string,
      private readonly modele: string,
      private readonly kilometrage: number,
      private readonly dateMiseEnService: Date,
      private readonly statut: string,
      private readonly clientId: UUID
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

    public getMarque(): string {
      return this.marque;
    }

    public getModele(): string {
      return this.modele;
    }

    public getKilometrage(): number {
      return this.kilometrage;
    } 

    public getDateMiseEnService(): Date {
      return this.dateMiseEnService;
    }

    public getStatut(): string {
      return this.statut;
    }

    public getClientId(): UUID {
      return this.clientId;
    }

    public getMotoId(): UUID {
      return this.motoId;
    }
  }