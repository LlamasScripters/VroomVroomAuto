"use client"

import { useState, useEffect } from "react"
import type { Panne, Moto, User } from "../../types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import { PanneService } from "../../services/panneService"
import { useAuthStore } from "@/stores/authStore"

interface PanneTableProps {
  pannes: Panne[]
  onEditPanne: (panne: Panne) => void
  onDeletePanne: (id: string) => void
}

export function PanneTable({ pannes, onEditPanne, onDeletePanne }: PanneTableProps) {
  const [motos, setMotos] = useState<{ [key: string]: Moto }>({})
  const [users, setUsers] = useState<{ [key: string]: User }>({})
  const { user } = useAuthStore()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userMotos = await PanneService.getUserMotos()
        setMotos(userMotos.reduce((acc, moto) => ({ ...acc, [String(moto.motoId)]: moto }), {}))

        if (user?.role === "admin") {
          const response = await fetch("http://localhost:3000/api/user", {
            headers: {
              Authorization: `Bearer ${useAuthStore.getState().token}`,
            },
          })
          const userData = await response.json()
            setUsers(userData.reduce((acc: { [key: string]: User }, user: User) => ({ ...acc, [user.userId]: user }), {}))
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error)
      }
    }

    fetchData()
  }, [user])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Moto</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Action Corrective</TableHead>
          <TableHead>Statut</TableHead>
          {user?.role === "admin" && <TableHead>Utilisateur</TableHead>}
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pannes.map((panne) => (
          <TableRow key={panne.panneId}>
            <TableCell>{motos[panne.motoId]?.model || "N/A"}</TableCell>
            <TableCell>{panne.description}</TableCell>
            <TableCell>{new Date(panne.date).toLocaleDateString('fr-FR', { year: '2-digit', month: '2-digit', day: '2-digit' })}</TableCell>
            <TableCell>{panne.actionCorrective}</TableCell>
            <TableCell>{panne.status}</TableCell>
            {user?.role === "admin" && <TableCell>{users[panne.userId]?.username || "N/A"}</TableCell>}
            <TableCell className="text-right">
              <Button variant="outline" size="icon" className="mr-2" onClick={() => onEditPanne(panne)}>
                <Edit className="h-4 w-4" />
                <span className="sr-only">Modifier</span>
              </Button>
              <Button variant="outline" size="icon" onClick={() => onDeletePanne(panne.panneId!)}>
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

