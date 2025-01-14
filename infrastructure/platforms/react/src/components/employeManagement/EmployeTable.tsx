import { Employe } from '../../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from 'lucide-react';

interface EmployeTableProps {
  employes: Employe[];
  onEditEmploye: (employe: Employe) => void;
  onDeleteEmploye: (id: string) => void;
}

function EmployeTable({ employes, onEditEmploye, onDeleteEmploye }: EmployeTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">N°</TableHead>
          <TableHead>Nom</TableHead>
          <TableHead>Prenom</TableHead>
          <TableHead>Mail</TableHead>
          <TableHead>Telephone</TableHead>
          <TableHead>Date de Création</TableHead>
          <TableHead>Dernière Connexion</TableHead>
          <TableHead>Rôle</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employes.map((employe, index) => (
          <TableRow key={employe.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{employe.nom}</TableCell>
            <TableCell>{employe.prenom}</TableCell>
            <TableCell>{employe.mail}</TableCell>
            <TableCell>{employe.telephone}</TableCell>
            <TableCell>{employe.dateCreation.toLocaleDateString()}</TableCell>
            <TableCell>{employe.derniereConnexion.toLocaleDateString()}</TableCell>
            <TableCell>{employe.role}</TableCell>
            <TableCell className="text-right">
              <Button
                variant="outline"
                size="icon"
                className="mr-2"
                onClick={() => onEditEmploye(employe)}
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Modifier</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onDeleteEmploye(employe.id!)}
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

export default EmployeTable;
