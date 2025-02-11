import type { Garantie, Moto, Panne } from "../types"
import axiosInstance from "../../axios"

export const GarantieService = {
  async getAllGaranties(): Promise<Garantie[]> {
    try {
      const response = await axiosInstance.get("/garanties")

      if (!response.data) {
        throw new Error("Erreur lors de la récupération des garanties")
      }

      return response.data
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des garanties: ${error}`)
    }
  },

  async createGarantie(garantie: Omit<Garantie, "garantieId">): Promise<Garantie> {
    try {
      const response = await axiosInstance.post("/garanties", garantie)

      if (!response.data) {
        throw new Error("Erreur lors de la création de la garantie")
      }

      return response.data
    } catch (error) {
      throw new Error(`Erreur lors de la création de la garantie: ${error}`)
    }
  },

  async updateGarantie(garantie: Garantie): Promise<Garantie> {
    try {
      const response = await axiosInstance.put(`/garanties/${garantie.garantieId}`, garantie)

      if (!response.data) {
        throw new Error("Erreur lors de la mise à jour de la garantie")
      }

      return response.data
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de la garantie: ${error}`)
    }
  },

  async deleteGarantie(id: string): Promise<void> {
    try {
      const response = await axiosInstance.delete(`/garanties/${id}`)

      if (!response.data) {
        throw new Error("Erreur lors de la suppression de la garantie")
      }
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de la garantie: ${error}`)
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

  async getUserPannes(): Promise<Panne[]> {
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
}

