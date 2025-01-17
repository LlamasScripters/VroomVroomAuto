// infrastructure/platforms/react/src/services/entretienService.ts
import { Entretien } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const EntretienService = {
  async getAllEntretiens(): Promise<Entretien[]> {
    const response = await fetch(`${API_URL}/entretien`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des entretiens');
    }
    return response.json();
  },

  async createEntretien(entretien: Entretien): Promise<Entretien> {
    const response = await fetch(`${API_URL}/entretien`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entretien)
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la création de l\'entretien');
    }
    return response.json();
  },

  async updateEntretien(entretien: Entretien): Promise<Entretien> {
    const response = await fetch(`${API_URL}/entretien/${entretien.entretienId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entretien)
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour de l\'entretien');
    }
    return response.json();
  },

  async deleteEntretien(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/entretien/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la suppression de l\'entretien');
    }
  }
};