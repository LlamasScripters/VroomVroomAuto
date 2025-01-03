import { Entretien } from '../../types'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from 'lucide-react'

interface EntretienTableProps {
  entretiens: Entretien[]
  onEditEntretien: (entretien: Entretien) => void
  onDeleteEntretien: (id: string) => void
}

export function EntretienTable({ entretiens, onEditEntretien, onDeleteEntretien }: EntretienTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">N°</TableHead>
          <TableHead>Modèle de Moto</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entretiens.map((entretien, index) => (
          <TableRow key={entretien.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{entretien.motoId}</TableCell>
            <TableCell>{entretien.type}</TableCell>
            <TableCell>{entretien.description}</TableCell>
            <TableCell>{entretien.date}</TableCell>
            <TableCell>{entretien.status}</TableCell>
            <TableCell className="text-right">
              <Button
                variant="outline"
                size="icon"
                className="mr-2"
                onClick={() => onEditEntretien(entretien)}
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Modifier</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onDeleteEntretien(entretien.id!)}
              >
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

export default EntretienTable

