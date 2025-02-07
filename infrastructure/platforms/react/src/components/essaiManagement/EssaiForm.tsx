"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Essai, Moto, Conducteur } from "../../types"
import { EssaiService } from "../../services/essaiService"
import { useAuthStore } from "@/stores/authStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EssaiFormProps {
    onSubmit: (essai: Omit<Essai, "essaiId">) => void
    onCancel: () => void
    initialData?: Essai
}

export function EssaiForm({ onSubmit, onCancel, initialData }: EssaiFormProps) {
    const { user } = useAuthStore()
    const [formData, setFormData] = useState<Omit<Essai, "essaiId">>({
        motoId: initialData?.motoId || "",
        conducteurId: initialData?.conducteurId || "",
        dateDebut: initialData?.dateDebut ? new Date(initialData.dateDebut).toISOString().split("T")[0] : "",
        dateFin: initialData?.dateFin ? new Date(initialData.dateFin).toISOString().split("T")[0] : "",
        duree: initialData?.duree || 0,
        userId: initialData?.userId || user?.id || "",
    })
    const [motos, setMotos] = useState<Moto[]>([])
    const [conducteurs, setConducteurs] = useState<Conducteur[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [motosData, conducteursData] = await Promise.all([
                    EssaiService.getUserMotos(),
                    EssaiService.getConducteurs(),
                ])
                setMotos(motosData)
                setConducteurs(conducteursData)
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
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">{initialData ? "Modifier un essai" : "Ajouter un essai"}</h2>

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
                <label htmlFor="conducteurId" className="block text-sm font-medium text-gray-700">
                    Conducteur
                </label>
                <Select
                    onValueChange={(value) => handleSelectChange("conducteurId", value)}
                    defaultValue={formData.conducteurId}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un conducteur" />
                    </SelectTrigger>
                    <SelectContent>
                        {conducteurs.map((conducteur) => (
                            <SelectItem key={conducteur.conducteurId} value={conducteur.conducteurId || ""}>
                                {conducteur.nom} {conducteur.prenom}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700">
                    Date de début
                </label>
                <Input
                    type="datetime"
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
                <Input
                    type="datetime"
                    id="dateFin"
                    name="dateFin"
                    value={formData.dateFin}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="duree" className="block text-sm font-medium text-gray-700">
                    Durée (en minutes)
                </label>
                <Input type="number" id="duree" name="duree" value={formData.duree} onChange={handleChange} required />
            </div>

            <input type="hidden" name="userId" value={formData.userId} />

            <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Annuler
                </Button>
                <Button type="submit">{initialData ? "Modifier" : "Ajouter"}</Button>
            </div>
        </form>
    )
}
