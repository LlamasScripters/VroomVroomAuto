import { UUID } from '../value-objects/UUID';

export class Essai {
    constructor(
      private readonly essaiId: UUID,
      private readonly motoId: UUID,
      private readonly ConducteurId: UUID,
      private readonly dateDebut: Date,
      private readonly dateFin: Date,
      private readonly duree: number,
      private readonly userId: UUID
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

    public getEssaiId(): UUID {
      return this.essaiId;
    }

    public getMotoId(): UUID {
      return this.motoId;
    } 

    public getConducteurId(): UUID {
      return this.ConducteurId;
    } 
      
    public getDateDebut(): Date {
      return this.dateDebut;
    }

    public getDateFin(): Date {
      return this.dateFin;
    }

    public getDuree(): number {
      return this.duree;
    }

    public getUserId(): UUID {
      return this.userId;
    }
  }