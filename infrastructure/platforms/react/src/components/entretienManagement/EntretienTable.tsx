// infrastructure/platforms/react/src/components/entretienManagement/EntretienTable.tsx

import { Entretien } from '../../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Eye, Trash2 } from 'lucide-react'

interface EntretienTableProps {
  entretiens: Entretien[];
  onEditEntretien: (entretien: Entretien) => void;
  onDeleteEntretien: (id: string) => void;
  onViewEntretien?: (entretien: Entretien) => void;
  readOnly?: boolean;
}

export function EntretienTable({ 
  entretiens, 
  onEditEntretien, 
  onDeleteEntretien,
  onViewEntretien,
  readOnly = false 
}: EntretienTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>N°</TableHead>
          <TableHead>Moto</TableHead>
          <TableHead>Type d'entretien</TableHead>
          <TableHead>Date prévue</TableHead>
          <TableHead>Date réalisée</TableHead>
          <TableHead>Kilométrage</TableHead>
          <TableHead>Coût</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entretiens.map((entretien, index) => (
          <TableRow key={entretien.entretienId}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>
              {entretien.motoDetails
                ? `${entretien.motoDetails.marque} ${entretien.motoDetails.model}`
                : entretien.motoId
              }
            </TableCell>
            <TableCell>{entretien.typeEntretien}</TableCell>
            <TableCell>{new Date(entretien.datePrevue).toLocaleDateString()}</TableCell>
            <TableCell>{entretien.dateRealisee ? new Date(entretien.dateRealisee).toLocaleDateString() : '-'}</TableCell>
            <TableCell>{entretien.kilometrageEntretien} km</TableCell>
            <TableCell>{entretien.cout}€</TableCell>
            <TableCell>{entretien.statut}</TableCell>
            <TableCell className="text-right">
              {onViewEntretien && (
                <Button
                  variant="outline"
                  size="icon"
                  className="mr-2"
                  onClick={() => onViewEntretien(entretien)}
                >
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">Voir</span>
                </Button>
              )}
              {!readOnly && (
                <>
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
                    onClick={() => onDeleteEntretien(entretien.entretienId!)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Supprimer</span>
                  </Button>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default EntretienTable;