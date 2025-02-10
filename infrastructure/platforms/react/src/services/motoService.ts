// infrastructure/platforms/react/src/services/motoService.ts
import { Moto } from '../types';
import axiosInstance from 'axios';

export const MotoService = {
  async getAllMotos(): Promise<Moto[]> {
    try {

      const response = await axiosInstance.get("motos")

      if (!response.data) {
        throw new Error('Erreur lors de la récupération des motos');
      }
      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des motos: ${error}`);
    }
  },

  async getMotoById(id: string): Promise<Moto> {
    try {

      const response = await axiosInstance.get(`motos/${id}`)
      if (!response.data) {
        throw new Error('Moto non trouvée');
      }
      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de la moto: ${error}`);
    }
  },

  async createMoto(motoData: Omit<Moto, 'id'>): Promise<Moto> {
    try {

      const response = await axiosInstance.post("motos", motoData)
  
      if (!response.data) {
        throw new Error('Erreur lors de la création de la moto');
      }
      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la création de la moto: ${error}`);
    }
  },

  async updateMoto(moto: Moto): Promise<Moto> {
    try {
        if (!moto.motoId) {
            throw new Error('ID de moto manquant');
        }

        const response = await axiosInstance.put(`motos/${moto.motoId}`, moto)
        
        if (!response.data) {
            throw new Error('Erreur lors de la mise à jour de la moto');
        }
        
        return response.data;
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour de la moto: ${error}`);
    }
  },

  async deleteMoto(id: string): Promise<void> {
    if (!id) {
      throw new Error('ID de moto invalide');
    }
    try {

      const response = await axiosInstance.delete(`motos/${id}`)
    
      if (!response.data) {
        throw new Error('Erreur lors de la suppression de la moto');
      }
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de la moto: ${error}`);
    }
  }
};