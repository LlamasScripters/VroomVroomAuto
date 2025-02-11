// application/dtos/MaintenancePlanningDTO.ts

export interface PiecePlanificationDTO {
  pieceId: string;
  quantite: number;
  prixUnitaire: number;
}

export interface PlanifierEntretienDTO {
  motoId: string;
  datePrevue?: string;
  kilometragePrevu?: number;
  typeEntretien?: string;
  notes?: string;
  pieces: PiecePlanificationDTO[];
  coutMainOeuvre: number;
  userId: string;
  gestionnaireId: string;
}

export interface MaintenanceInterval {
  kilometrage: number;
  tempsJours: number;
}

export interface MaintenancePlanningResult {
  needsMaintenance: boolean;
  nextMaintenanceKilometrage: number;
  nextMaintenanceDate: Date;
  reason?: string;
}

export interface MaintenancePlanningResultDTO {
  success: boolean;
  entretienId?: string;
  message: string;
  datePrevue: string;
  kilometragePrevu: number;
  modele: string;
  marque: string;
  regleAppliquee: {
    intervalleKilometrage: number;
    intervalleTemps: number;
    typeEntretien: string;
  };

  
}