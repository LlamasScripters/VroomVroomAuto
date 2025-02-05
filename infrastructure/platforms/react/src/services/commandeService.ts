// infrastructure/platforms/react/src/services/commandeService.ts
import { Commande } from '../types';
import { useAuthStore } from '@/stores/authStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const CommandeService = {
  async getAllCommandes(): Promise<Commande[]> {
    const token = useAuthStore.getState().token;
    
    try {
      const response = await fetch(`${API_URL}/commandes`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des commandes');
      }

      return response.json();
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des commandes: ${error}`);
    }
  },

    async createCommande(commandeData: {
      pieceId: string;
      quantiteCommandee: number;
      dateLivraisonPrevue: string;
      gestionnaireid: string;
  }): Promise<Commande> {
      const token = useAuthStore.getState().token;

      try {
          console.log('Données commande envoyées:', commandeData);

          const response = await fetch(`${API_URL}/commandes`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(commandeData)
          });

          if (!response.ok) {
              const errorData = await response.json();
              console.error('Réponse serveur:', errorData);
              throw new Error(errorData.error || 'Erreur lors de la création de la commande');
          }

          return response.json();
      } catch (error) {
          console.error('Erreur détaillée:', error);
          throw error;
      }
  },

  async updateCommande(commande: Commande): Promise<Commande> {
    const token = useAuthStore.getState().token;

    try {
      const response = await fetch(`${API_URL}/commandes/${commande.commandeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(commande)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de la commande');
      }

      return response.json();
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de la commande: ${error}`);
    }
  },

  async deleteCommande(id: string): Promise<void> {
    const token = useAuthStore.getState().token;

    try {
      const response = await fetch(`${API_URL}/commandes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de la commande');
      }
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de la commande: ${error}`);
    }
  },

  async updateStatut(commandeId: string, nouveauStatut: string): Promise<void> {
    const token = useAuthStore.getState().token;

    try {
      const response = await fetch(`${API_URL}/commandes/${commandeId}/statut`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ statut: nouveauStatut })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du statut');
      }
    } catch (error) {
      console.error('Erreur:', error);
      throw new Error('Erreur lors de la mise à jour du statut');
    }
  }

};