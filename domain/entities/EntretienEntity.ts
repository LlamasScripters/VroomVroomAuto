import { UUID } from '../value-objects/UUID';

export class Entretien {
    constructor(
      public readonly entretienId: UUID,
      public readonly motoId: UUID,
      public readonly typeEntretien: string,
      public readonly datePrevue: Date,
      public readonly dateRealisee: Date,
      public readonly kilometrageEntretien: number,
      public readonly recommandationsTechnicien: string,
      public readonly recommandationsGestionnaireClient: string,
      public readonly cout: number,
      public readonly statut: string,
      public readonly userId: UUID
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
  }