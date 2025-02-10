import { MaintenanceRule } from '../types';
import { MaintenancePlanningResultDTO } from '../../../../../application/dtos/MaintenancePlanningDTO';
import axiosInstance from '../../axios';

export const MaintenanceRuleService = {
  async getAllRules(): Promise<MaintenanceRule[]> {


    const response = await axiosInstance.get("/maintenance/rules")


    if (!response.data) {
      throw new Error('Erreur lors de la récupération des règles');
    }
    return response.data;
  },

  async createRule(rule: MaintenanceRule): Promise<MaintenanceRule> {

    const response = await axiosInstance.post("/maintenance/rules", rule)

    if (!response.data) {
      throw new Error('Erreur lors de la création de la règle');
    }
    return response.data;
  },

  async updateRule(rule: MaintenanceRule): Promise<MaintenanceRule> {

    const response = await axiosInstance.put(`/maintenance/rules/${rule.id}`, rule)

    if (!response.data) {
      throw new Error('Erreur lors de la mise à jour de la règle');
    }
    return response.data;
  },

  async deleteRule(id: string): Promise<void> {

    const response = await axiosInstance.delete(`/maintenance/rules/${id}`)

    if (!response.data) {
      throw new Error('Erreur lors de la suppression de la règle');
    }
  },

  async planifierEntretien(planification: {
    motoId: string;
    userId: string;
    datePrevue?: string;
    kilometragePrevu?: number;
    typeEntretien?: string;
    notes?: string;
    coutMainOeuvre: number;
    pieces: Array<{
      pieceId: string;
      quantite: number;
      prixUnitaire: number;
    }>;
  }): Promise<MaintenancePlanningResultDTO> {

    const response = await axiosInstance.post("/maintenance/planification", planification)
  
    if (!response.data) {
      const errorData = await response.data;
      throw new Error(errorData.error || 'Erreur lors de la planification de l\'entretien');
    }
  
    return response.data;
  }
};
