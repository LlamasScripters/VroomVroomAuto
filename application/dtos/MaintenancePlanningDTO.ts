// application/dtos/MaintenancePlanningDTO.ts

export interface PlanifierEntretienDTO {
    motoId: string;
    datePrevue?: string; // optionnel, on pourra le calculer automatiquement
    kilometragePrevu?: number; // pareil ici
    typeEntretien?: string; // si on l'spécifie pas, on utilisera la règle par défaut du modèle
    notes?: string;
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