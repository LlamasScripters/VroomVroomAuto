// infrastructure/platforms/react/src/services/entretienService.ts
import { Entretien, Moto } from '../types';
import { useAuthStore } from '@/stores/authStore';
import axiosInstance from 'axios';

export const EntretienService = {

  async getAllEntretiens(): Promise<Entretien[]> {
    
    try {

      const response = await axiosInstance.get("entretien")

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des entretiens');
      }

      return response.json();
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des entretiens: ${error}`);
    }
  },

  async getMyEntretiens(): Promise<Entretien[]> {
    const user = useAuthStore.getState().user;

    try {

      const motos = await axiosInstance.get("motos")

      // Filtrer les motos de l'utilisateur
      const userMotos = motos.filter((moto: Moto) => moto.userId === user?.id);
      const userMotoIds = userMotos.map((moto: Moto) => moto.motoId);

      const entretiens = await axiosInstance.get("entretien")

      // Filtrer les entretiens pour n'avoir que ceux des motos de l'utilisateur
      return entretiens.filter((entretien: Entretien) => 
        userMotoIds.includes(entretien.motoId)
      );
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des entretiens: ${error}`);
    }
  },



  async createEntretien(entretien: Entretien): Promise<Entretien> {

    const response = await axiosInstance.post("entretien", entretien)
  
    if (!response.ok) {
      throw new Error('Erreur lors de la création de l\'entretien');
    }
    return response.json();
  },

  async updateEntretien(entretien: Entretien): Promise<Entretien> {

    const response = await axiosInstance.put(`/entretien/${entretien.entretienId}`, entretien)

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour de l\'entretien');
    }
    return response.json();
  },

  async deleteEntretien(id: string): Promise<void> {

    const response = await axiosInstance.delete(`/entretien/${id}`)
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("L'entretien n'existe plus ou a déjà été supprimé");
      }
      throw new Error('Erreur lors de la suppression de l\'entretien');
    }
  }
};