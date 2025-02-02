// application/dtos/EntretienDTO.ts
export interface CreateEntretienDTO {
  motoId: string;
  typeEntretien: string;
  datePrevue: string;
  dateRealisee: string;
  kilometrageEntretien: number;
  recommandationsTechnicien: string;
  recommandationsGestionnaireClient: string;
  cout: number;
  statut: string;
  userId: string;
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
  cout?: number;
  statut?: string;
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
  datePrevue: string;
  dateRealisee: string;
  kilometrageEntretien: number;
  recommandationsTechnicien: string;
  recommandationsGestionnaireClient: string;
  cout: number;
  statut: string;
  userId: string;
}