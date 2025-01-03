import { Moto } from '../../types'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Wrench, Clock, Trash2 } from 'lucide-react'

interface MotoTableProps {
  motos: Moto[]
  onEditMoto: (moto: Moto) => void
  onShowMaintenance: (moto: Moto) => void
  onShowHistory: (moto: Moto) => void
  onDeleteMoto: (id: string) => void
}

export function MotoTable({ motos, onEditMoto, onShowMaintenance, onShowHistory, onDeleteMoto }: MotoTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Marque</TableHead>
          <TableHead>Modèle</TableHead>
          <TableHead>N° Série</TableHead>
          <TableHead>Kilométrage</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {motos.map((moto) => (
          <TableRow key={moto.id} className={moto.kilometrage > 20000 ? 'bg-red-100' : ''}>
            <TableCell>{moto.marque}</TableCell>
            <TableCell>{moto.model}</TableCell>
            <TableCell>{moto.serialNumber}</TableCell>
            <TableCell>{moto.kilometrage} km</TableCell>
            <TableCell>{moto.status}</TableCell>
            <TableCell className="text-right">
              <Button
                variant="outline"
                size="icon"
                className="mr-2"
                onClick={() => onEditMoto(moto)}
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Modifier</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="mr-2"
                onClick={() => onShowMaintenance(moto)}
              >
                <Wrench className="h-4 w-4" />
                <span className="sr-only">Entretiens</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="mr-2"
                onClick={() => onShowHistory(moto)}
              >
                <Clock className="h-4 w-4" />
                <span className="sr-only">Historique</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onDeleteMoto(moto.id!)}
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

export default MotoTable

