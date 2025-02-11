"use client"

import { useState, useEffect } from "react"
import type { Essai, Moto, Conducteur } from "../../types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import { EssaiService } from "../../services/essaiService"

interface EssaiTableProps {
  essais: Essai[]
  onEditEssai: (essai: Essai) => void
  onDeleteEssai: (id: string) => void
}

export function EssaiTable({ essais, onEditEssai, onDeleteEssai }: EssaiTableProps) {
  const [motos, setMotos] = useState<{ [key: string]: Moto }>({})
  const [conducteurs, setConducteurs] = useState<{ [key: string]: Conducteur }>({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [motosData, conducteursData] = await Promise.all([
          EssaiService.getUserMotos(),
          EssaiService.getConducteurs(),
        ])

        setMotos(motosData.reduce((acc, moto) => ({ ...acc, [String(moto.motoId)]: moto }), {}))
        setConducteurs(
          conducteursData.reduce((acc, conducteur) => ({ ...acc, [String(conducteur.conducteurId)]: conducteur }), {}),
        )
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Moto</TableHead>
          <TableHead>Conducteur</TableHead>
          <TableHead>Date de début</TableHead>
          <TableHead>Date de fin</TableHead>
          <TableHead>Durée (min)</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {essais.map((essai) => (
          <TableRow key={essai.essaiId}>
            <TableCell>{motos[essai.motoId]?.model || "N/A"}</TableCell>
            <TableCell>{`${conducteurs[essai.conducteurId]?.nom || "N/A"} ${conducteurs[essai.conducteurId]?.prenom || ""}`}</TableCell>
            <TableCell>{new Date(essai.dateDebut).toISOString().split("T")[0]}</TableCell>
            <TableCell>{new Date(essai.dateFin).toISOString().split("T")[0]}</TableCell>
            <TableCell>{essai.duree}</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="icon" className="mr-2" onClick={() => onEditEssai(essai)}>
                <Edit className="h-4 w-4" />
                <span className="sr-only">Modifier</span>
              </Button>
              <Button variant="outline" size="icon" onClick={() => onDeleteEssai(essai.essaiId!)}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Supprimer</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

