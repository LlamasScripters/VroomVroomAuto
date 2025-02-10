import { MaintenanceRule } from '../types';
import { MaintenancePlanningResultDTO } from '../../../../../application/dtos/MaintenancePlanningDTO';
import axiosInstance from 'axios';

export const MaintenanceRuleService = {
  async getAllRules(): Promise<MaintenanceRule[]> {


    const response = await axiosInstance.get("maintenance/rules")


    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des règles');
    }
    return response.json();
  },

  async createRule(rule: MaintenanceRule): Promise<MaintenanceRule> {

    const response = await axiosInstance.post("maintenance/rules", rule)

    if (!response.ok) {
      throw new Error('Erreur lors de la création de la règle');
    }
    return response.json();
  },

  async updateRule(rule: MaintenanceRule): Promise<MaintenanceRule> {

    const response = await axiosInstance.put(`maintenance/rules/${rule.id}`, rule)

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour de la règle');
    }
    return response.json();
  },

  async deleteRule(id: string): Promise<void> {

    const response = await axiosInstance.delete(`maintenance/rules/${id}`)

    if (!response.ok) {
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

    const response = await axiosInstance.post("maintenance/planification", planification)
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erreur lors de la planification de l\'entretien');
    }
  
    return response.json();
  }
};
