// infrastructure/platforms/react/src/services/pieceService.ts
import { Piece } from '../types';
import axiosInstance from 'axios';


export const PieceService = {
  async getAllPieces(): Promise<Piece[]> {
    try {

      const response = await axiosInstance.get("pieces")

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des pièces');
      }

      return response.json();
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des pièces: ${error}`);
    }
  },

  async createPiece(piece: Omit<Piece, 'pieceId' | 'stockCritique'>): Promise<Piece> {
    try {
      const response = await axiosInstance.post("pieces", piece)

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la pièce');
      }

      return response.json();
    } catch (error) {
      throw new Error(`Erreur lors de la création de la pièce: ${error}`);
    }
  },

  async updatePiece(piece: Piece): Promise<Piece> {
    try {

      const response = await axiosInstance.put(`pieces/${piece.pieceId}`, piece)

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de la pièce');
      }

      return response.json();
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de la pièce: ${error}`);
    }
  },

  async deletePiece(id: string): Promise<void> {
    try {

      const response = await axiosInstance.delete(`pieces/${id}`)

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de la pièce');
      }
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de la pièce: ${error}`);
    }
  },

  async verifierDisponibilite(pieceId: string, quantite: number): Promise<boolean> {

    const response = await axiosInstance.get(`pieces/${pieceId}/disponibilite?quantite=${quantite}`)

    if (!response.ok) {
      throw new Error('Erreur lors de la vérification de la disponibilité');
    }

    const result = await response.json();
    return result.disponible;
  },
};