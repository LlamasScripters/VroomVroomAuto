// infrastructure/platforms/react/src/services/commandeService.ts
import { Commande } from '../types';
import axiosInstance from 'axios';

export const CommandeService = {
  async getAllCommandes(): Promise<Commande[]> {
    
    try {
      const response = await axiosInstance.get("/commandes")

      if (!response.data) {
        throw new Error('Erreur lors de la récupération des commandes');
      }

      return response.data;
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

      try {
          console.log('Données commande envoyées:', commandeData);

          const response = await axiosInstance.post("/commandes", commandeData)

          if (!response.data) {
              const errorData = await response.data;
              console.error('Réponse serveur:', errorData);
              throw new Error(errorData.error || 'Erreur lors de la création de la commande');
          }

          return response.data;
      } catch (error) {
          console.error('Erreur détaillée:', error);
          throw error;
      }
  },

  async updateCommande(commande: Commande): Promise<Commande> {
    try {
      const response = await axiosInstance.put(`/commandes/${commande.commandeId}`, commande)

      if (!response.data) {
        throw new Error('Erreur lors de la mise à jour de la commande');
      }

      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de la commande: ${error}`);
    }
  },

  async deleteCommande(id: string): Promise<void> {
    try {

      const response = await axiosInstance.delete(`/commandes/${id}`)

      if (!response.data) {
        throw new Error('Erreur lors de la suppression de la commande');
      }
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de la commande: ${error}`);
    }
  },

  async updateStatut(commandeId: string, nouveauStatut: string): Promise<void> {
    try {

      const response = await axiosInstance.patch(`/commandes/${commandeId}/statut`, { statut: nouveauStatut })

      if (!response.data) {
        throw new Error('Erreur lors de la mise à jour du statut');
      }
    } catch (error) {
      console.error('Erreur:', error);
      throw new Error('Erreur lors de la mise à jour du statut');
    }
  }

};