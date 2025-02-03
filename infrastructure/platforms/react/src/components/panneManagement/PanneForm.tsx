import type React from "react"
import { useState, useEffect } from "react"
import { useAuthStore } from "@/stores/authStore"
import type { Panne, Moto } from "../../types"
import { PanneService } from "../../services/panneService"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PanneFormProps {
  onSubmit: (panne: Omit<Panne, "id">) => void
  onCancel: () => void
  initialData?: Panne
}

export function PanneForm({ onSubmit, onCancel, initialData }: PanneFormProps) {
  const [formData, setFormData] = useState<Omit<Panne, "id">>({
    motoId: initialData?.motoId || "",
    description: initialData?.description || "",
    date: initialData?.date || "",
    actionCorrective: initialData?.actionCorrective || "",
    status: initialData?.status || "à traiter",
    userId: useAuthStore.getState().user?.id || "" // Valeur en dur temporaire, à changer quand on aura mis en place la gestion des utilisateurs
  })
  const [motos, setMotos] = useState<Moto[]>([])

  useEffect(() => {
    const fetchMotos = async () => {
      try {
        const userMotos = await PanneService.getUserMotos()
        setMotos(userMotos)
      } catch (error) {
        console.error("Erreur lors de la récupération des motos:", error)
      }
    }

    fetchMotos()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">{initialData ? "Modifier une panne" : "Ajouter une panne"}</h2>

      <div>
        <label htmlFor="motoId" className="block text-sm font-medium text-gray-700">
          Moto
        </label>
        <Select onValueChange={(value) => handleSelectChange("motoId", value)} defaultValue={formData.motoId}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez une moto" />
          </SelectTrigger>
          <SelectContent>
            {motos.map((moto) => (
              <SelectItem key={moto.motoId} value={moto.motoId || ""}>
                {moto.model}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <Input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
      </div>

      <div>
        <label htmlFor="actionCorrective" className="block text-sm font-medium text-gray-700">
          Action Corrective
        </label>
        <Textarea
          id="actionCorrective"
          name="actionCorrective"
          value={formData.actionCorrective}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Statut
        </label>
        <Select onValueChange={(value) => handleSelectChange("status", value)} defaultValue={formData.status}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="à traiter">À traiter</SelectItem>
            <SelectItem value="en cours de traitement">En cours de traitement</SelectItem>
            <SelectItem value="traitée">Traitée</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit">{initialData ? "Modifier" : "Ajouter"}</Button>
      </div>
    </form>
  )
}

