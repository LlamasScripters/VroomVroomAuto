// infrastructure/platforms/react/src/services/maintenanceRuleService.ts
import { MaintenanceRule } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const MaintenanceRuleService = {
  async getAllRules(): Promise<MaintenanceRule[]> {
    const response = await fetch(`${API_URL}/maintenance/rules`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des règles');
    }
    return response.json();
  },

  async createRule(rule: MaintenanceRule): Promise<MaintenanceRule> {
    const response = await fetch(`${API_URL}/maintenance/rules`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rule),
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la création de la règle');
    }
    return response.json();
  },

  async updateRule(rule: MaintenanceRule): Promise<MaintenanceRule> {
    const response = await fetch(`${API_URL}/maintenance/rules/${rule.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rule),
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour de la règle');
    }
    return response.json();
  },

  async deleteRule(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/maintenance/rules/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la suppression de la règle');
    }
  },
};