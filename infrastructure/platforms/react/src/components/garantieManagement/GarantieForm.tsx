import type React from "react"
import { useState, useEffect } from "react"
import type { Garantie, Moto, Panne } from "../../types"
import { GarantieService } from "../../services/garantieService"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface GarantieFormProps {
  onSubmit: (garantie: Omit<Garantie, "garantieId">) => void
  onCancel: () => void
  initialData?: Garantie
}

export function GarantieForm({ onSubmit, onCancel, initialData }: GarantieFormProps) {
  const [formData, setFormData] = useState<Omit<Garantie, "garantieId">>({
    panneId: initialData?.panneId || "",
    motoId: initialData?.motoId || "",
    couverture: initialData?.couverture || "",
    type: initialData?.type || "",
    dateDebut: initialData?.dateDebut || "",
    dateFin: initialData?.dateFin || "",
    statut: initialData?.statut || "",
  })
  const [motos, setMotos] = useState<Moto[]>([])
  const [pannes, setPannes] = useState<Panne[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userMotos, userPannes] = await Promise.all([
          GarantieService.getUserMotos(),
          GarantieService.getUserPannes(),
        ])
        setMotos(userMotos)
        setPannes(userPannes)
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error)
      }
    }

    fetchData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (new Date(formData.dateDebut) > new Date(formData.dateFin)) {
      alert("La date de fin doit être antérieure à la date de début.")
      return
    }
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">{initialData ? "Modifier une garantie" : "Ajouter une garantie"}</h2>

      <div>
        <label htmlFor="panneId" className="block text-sm font-medium text-gray-700">
          Panne
        </label>
        <Select onValueChange={(value) => handleSelectChange("panneId", value)} defaultValue={formData.panneId}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez une panne" />
          </SelectTrigger>
          <SelectContent>
            {pannes.map((panne) => (
              <SelectItem key={panne.panneId} value={panne.panneId || ""}>
                {panne.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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
        <label htmlFor="couverture" className="block text-sm font-medium text-gray-700">
          Couverture
        </label>
        <Input
          type="text"
          id="couverture"
          name="couverture"
          value={formData.couverture}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Type
        </label>
        <Select onValueChange={(value) => handleSelectChange("type", value)} defaultValue={formData.type}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Moto">Moto</SelectItem>
            <SelectItem value="Piece">Piece</SelectItem>
            <SelectItem value="Entretien">Entretien</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700">
          Date de début
        </label>
        <Input
          type="date"
          id="dateDebut"
          name="dateDebut"
          value={formData.dateDebut}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700">
          Date de fin
        </label>
        <Input type="date" id="dateFin" name="dateFin" value={formData.dateFin} onChange={handleChange} required />
      </div>

      <div>
        <label htmlFor="statut" className="block text-sm font-medium text-gray-700">
          Statut
        </label>
        <Select onValueChange={(value) => handleSelectChange("statut", value)} defaultValue={formData.statut}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Expirée">Expirée</SelectItem>
            <SelectItem value="Utilisée">Utilisée</SelectItem>
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

