// infrastructure/platforms/react/src/services/conducteurService.ts
import { Conducteur } from '../types';
import { Moto } from '../types';
import axiosInstance from 'axios';



export const ConducteurService = {
    async getAllConducteurs(): Promise<Conducteur[]> {
        try {
            const response = await axiosInstance.get("conducteurs")

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des conducteurs');
            }
            return response.json();
        } catch (error) {
            throw new Error(`Erreur lors de la récupération des conducteurs: ${error}`);
        }
    },

    async getConducteurById(id: string): Promise<Conducteur> {
        try {

            const response = await axiosInstance.get(`conducteurs/${id}`)

            if (!response.ok) throw new Error('Conducteur non trouvé');
            return response.json();
        } catch (error) {
            throw new Error(`Erreur lors de la récupération du conducteur: ${error}`);
        }
    },

    async createConducteur(conducteurData: Omit<Conducteur, 'conducteurId'>): Promise<Conducteur> {
        try {

            const response = await axiosInstance.post("conducteurs", conducteurData)

            if (!response.ok) throw new Error('Erreur lors de la création du conducteur');
            return response.json();
        } catch (error) {
            throw new Error(`Erreur lors de la création du conducteur: ${error}`);
        }
    },

    async updateConducteur(conducteur: Conducteur): Promise<Conducteur> {
        try {
            if (!conducteur.conducteurId) {
                throw new Error('ID du conducteur manquant');
            }

            const response = await axiosInstance.put(`/conducteurs/${conducteur.conducteurId}`, conducteur)

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du conducteur');
            }

            return response.json();
        } catch (error) {
            throw new Error(`Erreur lors de la mise à jour du conducteur: ${error}`);
        }
    },

    async deleteConducteur(id: string): Promise<void> {
        try {

            const response = await axiosInstance.delete(`/conducteurs/${id}`)

            if (!response.ok) {
                throw new Error('Erreur lors de la suppression du conducteur');
            }
        } catch (error) {
            throw new Error(`Erreur lors de la suppression du conducteur: ${error}`);
        }
    },

    async getMotosByUserId(userId: string): Promise<Moto[]> {
        try {

            const response = await axiosInstance.get(`motos?userId=${userId}`)

          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des motos');
          }
          return response.json();
        } catch (error) {
          throw new Error(`Erreur lors de la récupération des motos: ${error}`);
        }
      }
};