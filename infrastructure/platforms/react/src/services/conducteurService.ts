// infrastructure/platforms/react/src/services/conducteurService.ts
import { Conducteur } from '../types';
import { useAuthStore } from '@/stores/authStore';
import { Moto } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const ConducteurService = {
    async getAllConducteurs(): Promise<Conducteur[]> {
        try {
            const response = await fetch(`${API_URL}/conducteurs`, {
                headers: {
                    'Authorization': `Bearer ${useAuthStore.getState().token}`
                }
            });
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
            const response = await fetch(`${API_URL}/conducteurs/${id}`, {
                headers: {
                    'Authorization': `Bearer ${useAuthStore.getState().token}`
                }
            });
            if (!response.ok) throw new Error('Conducteur non trouvé');
            return response.json();
        } catch (error) {
            throw new Error(`Erreur lors de la récupération du conducteur: ${error}`);
        }
    },

    async createConducteur(conducteurData: Omit<Conducteur, 'conducteurId'>): Promise<Conducteur> {
        try {
            const response = await fetch(`${API_URL}/conducteurs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useAuthStore.getState().token}`
                },
                body: JSON.stringify(conducteurData),
            });
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

            const response = await fetch(`${API_URL}/conducteurs/${conducteur.conducteurId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useAuthStore.getState().token}`
                },
                body: JSON.stringify(conducteur),
            });

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
            const response = await fetch(`${API_URL}/conducteurs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${useAuthStore.getState().token}`
                }
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la suppression du conducteur');
            }
        } catch (error) {
            throw new Error(`Erreur lors de la suppression du conducteur: ${error}`);
        }
    },

    async getMotosByUserId(userId: string): Promise<Moto[]> {
        try {
          const response = await fetch(`${API_URL}/motos?userId=${userId}`, {
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
      }
};