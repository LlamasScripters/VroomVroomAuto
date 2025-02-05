// infrastructure/platforms/react/src/services/pieceFournisseurService.ts
import { PieceFournisseur } from '../types';
import { useAuthStore } from '@/stores/authStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const PieceFournisseurService = {
    async getAllPieces(): Promise<PieceFournisseur[]> {
        const token = useAuthStore.getState().token;
        
        try {
            const response = await fetch(`${API_URL}/pieces-fournisseur`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération du catalogue');
            }

            return response.json();
        } catch (error) {
            throw new Error(`Erreur lors de la récupération du catalogue: ${error}`);
        }
    },

    async getPieceById(pieceId: string): Promise<PieceFournisseur> {
        const token = useAuthStore.getState().token;

        try {
            const response = await fetch(`${API_URL}/pieces-fournisseur/${pieceId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Pièce non trouvée');
            }

            return response.json();
        } catch (error) {
            throw new Error(`Erreur lors de la récupération de la pièce: ${error}`);
        }
    },

    async verifierDisponibilite(pieceId: string, quantite: number): Promise<boolean> {
        const token = useAuthStore.getState().token;

        try {
            const response = await fetch(`${API_URL}/pieces-fournisseur/${pieceId}/disponibilite?quantite=${quantite}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la vérification de la disponibilité');
            }

            const result = await response.json();
            return result.disponible;
        } catch (error) {
            throw new Error(`Erreur lors de la vérification de la disponibilité: ${error}`);
        }
    },
    async createPieceFournisseur(pieceData: Omit<PieceFournisseur, "pieceId" | "stockCritique" | "disponible">): Promise<PieceFournisseur> {
        const token = useAuthStore.getState().token;
        
        try {
            const response = await fetch(`${API_URL}/pieces-fournisseur`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(pieceData)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la création de la pièce');
            }

            return response.json();
        } catch (error) {
            throw new Error(`Erreur lors de la création de la pièce: ${error}`);
        }
    },

    async updatePieceFournisseur(pieceId: string, pieceData: Partial<PieceFournisseur>): Promise<PieceFournisseur> {
        const token = useAuthStore.getState().token;

        try {
            const response = await fetch(`${API_URL}/pieces-fournisseur/${pieceId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(pieceData)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour de la pièce');
            }

            return response.json();
        } catch (error) {
            throw new Error(`Erreur lors de la mise à jour de la pièce: ${error}`);
        }
    },

    async deletePieceFournisseur(pieceId: string): Promise<void> {
        const token = useAuthStore.getState().token;

        try {
            const response = await fetch(`${API_URL}/pieces-fournisseur/${pieceId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la suppression de la pièce');
            }
        } catch (error) {
            throw new Error(`Erreur lors de la suppression de la pièce: ${error}`);
        }
    }
};