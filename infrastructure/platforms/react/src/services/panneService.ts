import type { Panne, Moto } from "../types"
import { useAuthStore } from "@/stores/authStore"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

export const PanneService = {
  async getAllPannes(): Promise<Panne[]> {
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

  async createPanne(panne: Omit<Panne, "id">): Promise<Panne> {
    const token = useAuthStore.getState().token
    try {
      const response = await fetch(`${API_URL}/pannes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(panne),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la panne")
      }

      return response.json()
    } catch (error) {
      throw new Error(`Erreur lors de la création de la panne: ${error}`)
    }
  },

  async updatePanne(panne: Panne): Promise<Panne> {
    const token = useAuthStore.getState().token

    try {
      const response = await fetch(`${API_URL}/pannes/${panne.panneId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(panne),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de la panne")
      }

      return response.json()
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de la panne: ${error}`)
    }
  },

  async deletePanne(id: string): Promise<void> {
    const token = useAuthStore.getState().token

    try {
      const response = await fetch(`${API_URL}/pannes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la panne")
      }
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de la panne: ${error}`)
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
}

