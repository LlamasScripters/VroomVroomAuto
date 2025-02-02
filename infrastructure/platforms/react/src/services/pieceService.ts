// infrastructure/platforms/react/src/services/pieceService.ts
import { Piece } from '../types';
import { useAuthStore } from '@/stores/authStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const PieceService = {
  async getAllPieces(): Promise<Piece[]> {
    const token = useAuthStore.getState().token;
    
    try {
      const response = await fetch(`${API_URL}/pieces`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des pièces');
      }

      return response.json();
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des pièces: ${error}`);
    }
  },

  async createPiece(piece: Omit<Piece, 'pieceId' | 'stockCritique'>): Promise<Piece> {
    const token = useAuthStore.getState().token;
    
    try {
      const response = await fetch(`${API_URL}/pieces`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(piece)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la pièce');
      }

      return response.json();
    } catch (error) {
      throw new Error(`Erreur lors de la création de la pièce: ${error}`);
    }
  },

  async updatePiece(piece: Piece): Promise<Piece> {
    const token = useAuthStore.getState().token;
    
    try {
      const response = await fetch(`${API_URL}/pieces/${piece.pieceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(piece)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de la pièce');
      }

      return response.json();
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de la pièce: ${error}`);
    }
  },

  async deletePiece(id: string): Promise<void> {
    const token = useAuthStore.getState().token;
    
    try {
      const response = await fetch(`${API_URL}/pieces/${id}`, {
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