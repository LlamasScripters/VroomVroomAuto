import type { Panne } from "../../types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"

interface PanneTableProps {
  pannes: Panne[]
  onEditPanne: (panne: Panne) => void
  onDeletePanne: (id: string) => void
}

export function PanneTable({ pannes, onEditPanne, onDeletePanne }: PanneTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Moto</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Action Corrective</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pannes.map((panne) => (
          <TableRow key={panne.panneId}>
            <TableCell>{panne.motoId}</TableCell>
            <TableCell>{panne.description}</TableCell>
            <TableCell>{new Date(panne.date).toLocaleDateString('fr-FR', { year: '2-digit', month: '2-digit', day: '2-digit' })}</TableCell>
            <TableCell>{panne.actionCorrective}</TableCell>
            <TableCell>{panne.status}</TableCell>
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

