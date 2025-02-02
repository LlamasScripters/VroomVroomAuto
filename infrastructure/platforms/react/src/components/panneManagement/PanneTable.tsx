import { Panne } from '../../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from 'lucide-react';

interface PanneTableProps {
  pannes: Panne[];
  onEditPanne: (panne: Panne) => void;
  onDeletePanne: (id: string) => void;
}

export function PanneTable({ pannes, onEditPanne, onDeletePanne }: PanneTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">N°</TableHead>
          <TableHead>ID de la Moto</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Action Corrective</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pannes.map((panne, index) => (
          <TableRow key={panne.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{panne.motoId}</TableCell>
            <TableCell>{panne.description}</TableCell>
            <TableCell>{panne.date}</TableCell>
            <TableCell>{panne.actionCorrective}</TableCell>
            <TableCell>{panne.status}</TableCell>
            <TableCell className="text-right">
              <Button
                variant="outline"
                size="icon"
                className="mr-2"
                onClick={() => onEditPanne(panne)}
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Modifier</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onDeletePanne(panne.id!)}
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

export default PanneTable;
