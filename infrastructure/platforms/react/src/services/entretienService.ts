// infrastructure/platforms/react/src/services/entretienService.ts
import { Entretien, Moto } from '../types';
import { useAuthStore } from '@/stores/authStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const EntretienService = {

  async getAllEntretiens(): Promise<Entretien[]> {
    const token = useAuthStore.getState().token;
    
    try {
      const response = await fetch(`${API_URL}/entretien`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des entretiens');
      }

      return response.json();
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des entretiens: ${error}`);
    }
  },

  async getMyEntretiens(): Promise<Entretien[]> {
    const token = useAuthStore.getState().token;
    const user = useAuthStore.getState().user;

    try {
      const motos = await fetch(`${API_URL}/motos`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(res => res.json());

      // Filtrer les motos de l'utilisateur
      const userMotos = motos.filter((moto: Moto) => moto.userId === user?.id);
      const userMotoIds = userMotos.map((moto: Moto) => moto.motoId);

      const entretiens = await fetch(`${API_URL}/entretien`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(res => res.json());

      // Filtrer les entretiens pour n'avoir que ceux des motos de l'utilisateur
      return entretiens.filter((entretien: Entretien) => 
        userMotoIds.includes(entretien.motoId)
      );
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des entretiens: ${error}`);
    }
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
      if (response.status === 404) {
        throw new Error("L'entretien n'existe plus ou a déjà été supprimé");
      }
      throw new Error('Erreur lors de la suppression de l\'entretien');
    }
  }
};