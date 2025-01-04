import { Garantie } from '../../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from 'lucide-react';

interface GarantieTableProps {
  garanties: Garantie[];
  onEditGarantie: (garantie: Garantie) => void;
  onDeleteGarantie: (id: string) => void;
}

export function GarantieTable({ garanties, onEditGarantie, onDeleteGarantie }: GarantieTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">N°</TableHead>
          <TableHead>Modèle de Moto</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Date Début</TableHead>
          <TableHead>Date Fin</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {garanties.map((garantie, index) => (
          <TableRow key={garantie.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{garantie.motoId}</TableCell>
            <TableCell>{garantie.description}</TableCell>
            <TableCell>{garantie.dateDebut}</TableCell>
            <TableCell>{garantie.dateFin}</TableCell>
            <TableCell>{garantie.status}</TableCell>
            <TableCell className="text-right">
              <Button
                variant="outline"
                size="icon"
                className="mr-2"
                onClick={() => onEditGarantie(garantie)}
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Modifier</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onDeleteGarantie(garantie.id!)}
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

export default GarantieTable;
