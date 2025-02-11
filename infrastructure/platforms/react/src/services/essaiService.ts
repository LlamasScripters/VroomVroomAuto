import type { Essai, Moto, Conducteur } from "../types"
import axiosInstance from "../../axios"

export const EssaiService = {
  async getAllEssais(): Promise<Essai[]> {
    try {
      const response = await axiosInstance.get("/essais")

      if (!response.data) {
        throw new Error("Erreur lors de la récupération des essais")
      }

      return response.data
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des essais: ${error}`)
    }
  },

  async createEssai(essai: Omit<Essai, "essaiId">): Promise<Essai> {
    try {
      const response = await axiosInstance.post("/essais", essai)

      if (!response.data) {
        throw new Error("Erreur lors de la création de l'essai")
      }

      return response.data
    } catch (error) {
      throw new Error(`Erreur lors de la création de l'essai: ${error}`)
    }
  },

  async updateEssai(essai: Essai): Promise<Essai> {
    try {
      const response = await axiosInstance.put(`/essais/${essai.essaiId}`, essai)

      if (!response.data) {
        throw new Error("Erreur lors de la mise à jour de l'essai")
      }

      return response.data
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de l'essai: ${error}`)
    }
  },

  async deleteEssai(id: string): Promise<void> {
    try {
      const response = await axiosInstance.delete(`/essais/${id}`)

      if (!response.data) {
        throw new Error("Erreur lors de la suppression de l'essai")
      }
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de l'essai: ${error}`)
    }
  },

  async getUserMotos(): Promise<Moto[]> {
    try {
      const response = await axiosInstance.get("/motos")

      if (!response.data) {
        throw new Error("Erreur lors de la récupération des motos")
      }

      return response.data
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des motos: ${error}`)
    }
  },

  async getConducteurs(): Promise<Conducteur[]> {
    try {
      const response = await axiosInstance.get("/conducteurs")

      if (!response.data) {
        throw new Error("Erreur lors de la récupération des conducteurs")
      }

      return response.data
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des conducteurs: ${error}`)
    }
  },

  async getEssaisByConducteurId(conducteurId: string): Promise<Essai[]> {
    try {
      const response = await axiosInstance.get(`/essais/conducteur/${conducteurId}`)

      if (!response.data) {
        throw new Error("Erreur lors de la récupération des essais du conducteur")
      }

      return response.data
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des essais du conducteur: ${error}`)
    }
  },

}
