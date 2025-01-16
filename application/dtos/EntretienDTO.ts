// application/dtos/EntretienDTO.ts
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