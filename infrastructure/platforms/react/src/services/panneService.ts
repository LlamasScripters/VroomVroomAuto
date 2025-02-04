import type { Panne, Moto } from "../types"
import axiosInstance from "../../axios"

export const PanneService = {
  async getAllPannes(): Promise<Panne[]> {
    try {
      const response = await axiosInstance.get("/pannes")

      if (!response.data) {
        throw new Error("Erreur lors de la récupération des pannes")
      }

      return response.data
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des pannes: ${error}`)
    }
  },

  async createPanne(panne: Omit<Panne, "id">): Promise<Panne> {
    try {
      const response = await axiosInstance.post("pannes", panne)

      if (!response.data) {
        throw new Error("Erreur lors de la création de la panne")
      }

      return response.data
    } catch (error) {
      throw new Error(`Erreur lors de la création de la panne: ${error}`)
    }
  },

  async updatePanne(panne: Panne): Promise<Panne> {
    try {
      const response = await axiosInstance.put(`/pannes/${panne.panneId}`, panne)

      if (!response.data) {
        throw new Error("Erreur lors de la mise à jour de la panne")
      }

      return response.data
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de la panne: ${error}`)
    }
  },

  async deletePanne(id: string): Promise<void> {
    try {
      const response = await axiosInstance.delete(`/pannes/${id}`)

      if (!response.data) {
        throw new Error("Erreur lors de la suppression de la panne")
      }
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de la panne: ${error}`)
    }
  },

  async getUserMotos(): Promise<Moto[]> {
    try {
      const response = await axiosInstance.get(`/motos`)

      if (!response.data) {
        throw new Error("Erreur lors de la récupération des motos")
      }

      return response.data
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des motos: ${error}`)
    }
  },
}

