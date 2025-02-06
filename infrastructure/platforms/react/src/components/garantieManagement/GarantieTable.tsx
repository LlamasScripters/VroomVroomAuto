"use client"

import { useState, useEffect } from "react"
import type { Garantie, Moto, Panne } from "../../types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import { MotoService } from "../../services/motoService"
import { PanneService } from "../../services/panneService"

interface GarantieTableProps {
  garanties: Garantie[]
  onEditGarantie: (garantie: Garantie) => void
  onDeleteGarantie: (id: string) => void
}

export function GarantieTable({ garanties, onEditGarantie, onDeleteGarantie }: GarantieTableProps) {
  const [motos, setMotos] = useState<{ [key: string]: Moto }>({})
  const [pannes, setPannes] = useState<{ [key: string]: Panne }>({})

  useEffect(() => {
    const fetchData = async () => {
      const motosData = await MotoService.getAllMotos()
      const pannesData = await PanneService.getAllPannes()

      setMotos(motosData.reduce((acc, moto) => ({ ...acc, [String(moto.motoId)]: moto }), {}))
      setPannes(pannesData.reduce((acc, panne) => ({ ...acc, [String(panne.panneId)]: panne }), {}))
    }

    fetchData()
  }, [])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Panne</TableHead>
          <TableHead>Moto</TableHead>
          <TableHead>Couverture</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date de début</TableHead>
          <TableHead>Date de fin</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {garanties.map((garantie) => (
          <TableRow key={garantie.garantieId}>
            <TableCell>{pannes[garantie.panneId]?.description || "N/A"}</TableCell>
            <TableCell>{motos[garantie.motoId]?.model || "N/A"}</TableCell>
            <TableCell>{garantie.couverture}</TableCell>
            <TableCell>{garantie.type}</TableCell>
            <TableCell>{new Date(garantie.dateDebut).toLocaleDateString('fr-FR', { year: '2-digit', month: '2-digit', day: '2-digit' })}</TableCell>
            <TableCell>{new Date(garantie.dateFin).toLocaleDateString('fr-FR', { year: '2-digit', month: '2-digit', day: '2-digit' })}</TableCell>
            <TableCell>{garantie.statut}</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="icon" className="mr-2" onClick={() => onEditGarantie(garantie)}>
                <Edit className="h-4 w-4" />
                <span className="sr-only">Modifier</span>
              </Button>
              <Button variant="outline" size="icon" onClick={() => onDeleteGarantie(garantie.garantieId!)}>
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

