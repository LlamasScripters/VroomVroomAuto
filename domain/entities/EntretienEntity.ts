import { UUID } from '../value-objects/UUID';

export class Entretien {
    constructor(
      private readonly entretienId: UUID,
      private readonly motoId: UUID,
      private readonly typeEntretien: string,
      private readonly datePrevue: Date,
      private readonly dateRealisee: Date,
      private readonly kilometrageEntretien: number,
      private readonly recommandationsTechnicien: string,
      private readonly recommandationsGestionnaireClient: string,
      private readonly cout: number,
      private readonly statut: string,
      private readonly userId: UUID
    ) {}

    public static create(
      entretienId: UUID,
      motoId: UUID,
      typeEntretien: string,
      datePrevue: Date,
      dateRealisee: Date,
      kilometrageEntretien: number,
      recommandationsTechnicien: string,
      recommandationsGestionnaireClient: string,
      cout: number,
      statut: string,
      userId: UUID
    ): Entretien {
      return new Entretien(entretienId, motoId, typeEntretien, datePrevue, dateRealisee, kilometrageEntretien, recommandationsTechnicien, recommandationsGestionnaireClient, cout, statut, userId);
    }

    public getMotoId(): UUID {
      return this.motoId;
    }

    public getTypeEntretien(): string {
      return this.typeEntretien;
    }

    public getDatePrevue(): Date {
      return this.datePrevue;
    }

    public getDateRealisee(): Date {
      return this.dateRealisee;
    }

    public getKilometrageEntretien(): number {
      return this.kilometrageEntretien;
    }

    public getRecommandationsTechnicien(): string {
      return this.recommandationsTechnicien;
    }

    public getRecommandationsGestionnaireClient(): string {
      return this.recommandationsGestionnaireClient;
    }

    public getCout(): number {
      return this.cout;
    }

    public getStatut(): string {
      return this.statut;
    }

    public getUserId(): UUID {
      return this.userId;
    }

    public getEntretienId(): UUID {
      return this.entretienId;
    }
  }