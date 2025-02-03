// application/dtos/EntretienDTO.ts
import { EntretienPiece } from '@domain/entities/EntretienPieceEntity';
export interface CreateEntretienDTO {
  motoId: string;
  typeEntretien: string;
  datePrevue: string;
  dateRealisee: string;
  kilometrageEntretien: number;
  recommandationsTechnicien: string;
  recommandationsGestionnaireClient: string;
  statut: string;
  userId: string;
  gestionnaireId: string;
  coutMainOeuvre: number; 
  coutPieces: number;       
  pieces?: EntretienPiece[];
}

export interface UpdateEntretienDTO {
  entretienId: string;
  motoId?: string;
  typeEntretien?: string;
  datePrevue?: string;
  dateRealisee?: string;
  kilometrageEntretien?: number;
  recommandationsTechnicien?: string;
  recommandationsGestionnaireClient?: string;
  statut?: string;
  coutMainOeuvre?: number;
  coutPieces?: number;
  pieces?: EntretienPiece[];
}

export interface DeleteEntretienDTO {
  entretienId: string;
}

export interface GetEntretienDTO {
  entretienId: string;
}

export interface EntretienDTO {
  entretienId: string;
  motoId: string;
  motoDetails?: {
    marque: string;
    model: string;
    serialNumber: string;
  };
  typeEntretien: string;
  datePrevue: string |null;
  dateRealisee: string |null;
  kilometrageEntretien: number;
  recommandationsTechnicien: string;
  recommandationsGestionnaireClient: string;
  statut: string;
  userId: string;
  gestionnaireId: string;
  coutMainOeuvre: number;
  coutPieces: number;
  coutTotal: number;
  pieces?: PieceEntretienDTO[];
}

export interface PieceEntretienDTO {
  pieceId: string;
  quantite: number;
  prixUnitaire: number;
  gestionnaireId: string;
}