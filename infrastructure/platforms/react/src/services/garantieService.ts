import type { Garantie, Moto, Panne } from "../types"
import { useAuthStore } from "@/stores/authStore"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

export const GarantieService = {
  async getAllGaranties(): Promise<Garantie[]> {
    const token = useAuthStore.getState().token

    try {
      const response = await fetch(`${API_URL}/garanties`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des garanties")
      }

      return response.json()
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des garanties: ${error}`)
    }
  },

  async createGarantie(garantie: Omit<Garantie, "garantieId">): Promise<Garantie> {
    const token = useAuthStore.getState().token

    try {
      const response = await fetch(`${API_URL}/garanties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(garantie),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la garantie")
      }

      return response.json()
    } catch (error) {
      throw new Error(`Erreur lors de la création de la garantie: ${error}`)
    }
  },

  async updateGarantie(garantie: Garantie): Promise<Garantie> {
    const token = useAuthStore.getState().token

    try {
      const response = await fetch(`${API_URL}/garanties/${garantie.garantieId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(garantie),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de la garantie")
      }

      return response.json()
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de la garantie: ${error}`)
    }
  },

  async deleteGarantie(id: string): Promise<void> {
    const token = useAuthStore.getState().token

    try {
      const response = await fetch(`${API_URL}/garanties/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la garantie")
      }
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de la garantie: ${error}`)
    }
  },

  async getUserMotos(): Promise<Moto[]> {
    const token = useAuthStore.getState().token

    try {
      const response = await fetch(`${API_URL}/motos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des motos")
      }

      return response.json()
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des motos: ${error}`)
    }
  },

  async getUserPannes(): Promise<Panne[]> {
    const token = useAuthStore.getState().token

    try {
      const response = await fetch(`${API_URL}/pannes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des pannes")
      }

      return response.json()
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des pannes: ${error}`)
    }
  },
}

