import { UUID } from '../value-objects/UUID';
import { EntretienPiece } from './EntretienPieceEntity';

export interface MotoDetails {
  marque: string;
  model: string;
  serialNumber: string;
}

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
      public readonly statut: string,
      public readonly userId: UUID,
      public readonly gestionnaireId: UUID,
      public readonly coutMainOeuvre: number,   
      public readonly coutPieces: number,      
      public readonly motoDetails?: MotoDetails,
      public readonly pieces?: EntretienPiece[]
    ) {
      this.validateCouts();
    }

    private validateCouts(): void {
      if (this.coutMainOeuvre !== undefined && this.coutMainOeuvre < 0) {
        throw new Error('Le coût de main d\'œuvre ne peut pas être négatif');
      }
      if (this.coutPieces !== undefined && this.coutPieces < 0) {
        throw new Error('Le coût des pièces ne peut pas être négatif');
      }
    }

    public getCoutTotal(): number {
      return (this.coutMainOeuvre ?? 0) + (this.coutPieces ?? 0);
    }

    public static create(
      entretienId: UUID,
      motoId: UUID,
      typeEntretien: string,
      datePrevue: Date,
      dateRealisee: Date,
      kilometrageEntretien: number,
      recommandationsTechnicien: string,
      recommandationsGestionnaireClient: string,
      statut: string,
      userId: UUID,
      gestionnaireId: UUID,  
      coutMainOeuvre: number,
      coutPieces: number,
      motoDetails?: MotoDetails,
      pieces?: EntretienPiece[]
    ): Entretien {
      return new Entretien(entretienId, motoId, typeEntretien, datePrevue, dateRealisee, kilometrageEntretien, recommandationsTechnicien, recommandationsGestionnaireClient, statut, userId,gestionnaireId, coutMainOeuvre, coutPieces, motoDetails, pieces); 
    }
  }