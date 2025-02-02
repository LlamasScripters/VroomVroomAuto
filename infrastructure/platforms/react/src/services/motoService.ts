// infrastructure/platforms/react/src/services/motoService.ts

import { Moto } from '../types';
import { useAuthStore } from '@/stores/authStore';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const MotoService = {
  async getAllMotos(): Promise<Moto[]> {
    try {
      const response = await fetch(`${API_URL}/motos`, {
        headers: {
          'Authorization': `Bearer ${useAuthStore.getState().token}`
        }
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des motos');
      }
      return response.json();
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des motos: ${error}`);
    }
  },

  async getMotoById(id: string): Promise<Moto> {
    try {
      const response = await fetch(`${API_URL}/motos/${id}`);
      if (!response.ok) {
        throw new Error('Moto non trouvée');
      }
      return response.json();
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de la moto: ${error}`);
    }
  },

  async createMoto(motoData: Omit<Moto, 'id'>): Promise<Moto> {
    try {
      const token = useAuthStore.getState().token;
      const response = await fetch(`${API_URL}/motos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(motoData),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la création de la moto');
      }
      return response.json();
    } catch (error) {
      throw new Error(`Erreur lors de la création de la moto: ${error}`);
    }
  },

  async updateMoto(moto: Moto): Promise<Moto> {
    try {
        if (!moto.motoId) {
            throw new Error('ID de moto manquant');
        }
      
        const response = await fetch(`${API_URL}/motos/${moto.motoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(moto),
        });
        
        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour de la moto');
        }
        
        return response.json();
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour de la moto: ${error}`);
    }
  },

  async deleteMoto(id: string): Promise<void> {
    if (!id) {
      throw new Error('ID de moto invalide');
    }
    try {
      const response = await fetch(`${API_URL}/motos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de la moto');
      }
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de la moto: ${error}`);
    }
  }
};