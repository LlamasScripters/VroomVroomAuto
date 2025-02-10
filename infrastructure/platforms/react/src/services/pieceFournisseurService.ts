// infrastructure/platforms/react/src/services/pieceFournisseurService.ts
import { PieceFournisseur } from '../types';
import axiosInstance from '../../axios';

export const PieceFournisseurService = {
    async getAllPieces(): Promise<PieceFournisseur[]> {
        try {

            const response = await axiosInstance.get("/pieces-fournisseur")

            if (!response.data) {
                throw new Error('Erreur lors de la récupération du catalogue');
            }

            return response.data;
        } catch (error) {
            throw new Error(`Erreur lors de la récupération du catalogue: ${error}`);
        }
    },

    async getPieceById(pieceId: string): Promise<PieceFournisseur> {
        try {

            const response = await axiosInstance.get(`/pieces-fournisseur/${pieceId}`)

            if (!response.data) {
                throw new Error('Pièce non trouvée');
            }

            return response.data;
        } catch (error) {
            throw new Error(`Erreur lors de la récupération de la pièce: ${error}`);
        }
    },

    async verifierDisponibilite(pieceId: string, quantite: number): Promise<boolean> {
        try {

            const response = await axiosInstance.get(`/pieces-fournisseur/${pieceId}/disponibilite?quantite=${quantite}`)

            if (!response.data) {
                throw new Error('Erreur lors de la vérification de la disponibilité');
            }

            const result = await response.data;
            return result.disponible;
        } catch (error) {
            throw new Error(`Erreur lors de la vérification de la disponibilité: ${error}`);
        }
    },
    async createPieceFournisseur(pieceData: Omit<PieceFournisseur, "pieceId" | "stockCritique" | "disponible">): Promise<PieceFournisseur> {
        try {

            const response = await axiosInstance.post("/pieces-fournisseur", pieceData)

            if (!response.data) {
                throw new Error('Erreur lors de la création de la pièce');
            }

            return response.data;
        } catch (error) {
            throw new Error(`Erreur lors de la création de la pièce: ${error}`);
        }
    },

    async updatePieceFournisseur(pieceId: string, pieceData: Partial<PieceFournisseur>): Promise<PieceFournisseur> {
        try {

            const response = await axiosInstance.put(`/pieces-fournisseur/${pieceId}`, pieceData)

            if (!response.data) {
                throw new Error('Erreur lors de la mise à jour de la pièce');
            }

            return response.data;
        } catch (error) {
            throw new Error(`Erreur lors de la mise à jour de la pièce: ${error}`);
        }
    },

    async deletePieceFournisseur(pieceId: string): Promise<void> {
        try {

            const response = await axiosInstance.delete(`/pieces-fournisseur/${pieceId}`)

            if (!response.data) {
                throw new Error('Erreur lors de la suppression de la pièce');
            }
        } catch (error) {
            throw new Error(`Erreur lors de la suppression de la pièce: ${error}`);
        }
    }
};