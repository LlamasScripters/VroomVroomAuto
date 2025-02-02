import { Reparation } from '../../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from 'lucide-react';

interface ReparationTableProps {
  reparations: Reparation[];
  onEditReparation: (reparation: Reparation) => void;
  onDeleteReparation: (id: string) => void;
}

function ReparationTable({ reparations, onEditReparation, onDeleteReparation }: ReparationTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">N°</TableHead>
          <TableHead>ID de la Panne</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions Correctives</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reparations.map((reparation, index) => (
          <TableRow key={reparation.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{reparation.panneId}</TableCell>
            <TableCell>{reparation.description}</TableCell>
            <TableCell>{reparation.date}</TableCell>
            <TableCell>
              <ul>
                {reparation.actionsCorrectives.map((action, idx) => (
                  <li key={idx}>{action}</li>
                ))}
              </ul>
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="outline"
                size="icon"
                className="mr-2"
                onClick={() => onEditReparation(reparation)}
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Modifier</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onDeleteReparation(reparation.id!)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Supprimer</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ReparationTable;
