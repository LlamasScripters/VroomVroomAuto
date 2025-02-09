// application/dtos/MaintenanceRuleDTO.ts

export interface CreateMaintenanceRuleDTO {
    modele: string;
    intervalleKilometrage: number;
    intervalleTemps: number;
    typeEntretien: string;
  }
  
  export interface UpdateMaintenanceRuleDTO {
    ruleId: string;
    modele?: string;
    intervalleKilometrage?: number; 
    intervalleTemps?: number;
    typeEntretien?: string;
  }
  
  export interface DeleteMaintenanceRuleDTO {
    ruleId: string;
  }
  
  export interface GetMaintenanceRuleDTO {
    ruleId: string;
  }
  
  export interface MaintenanceRuleDTO {
    ruleId: string;
    modele: string;
    intervalleKilometrage: number;
    intervalleTemps: number;
    typeEntretien: string;
    nombreEntretiensPrevus?: number;
    dateDernierEntretien?: string;
  }