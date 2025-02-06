// infrastructure/platforms/react/src/components/conducteurManagement/ConducteurTable.tsx
import { Conducteur } from '../../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from 'lucide-react';

interface ConducteurTableProps {
  conducteurs: Conducteur[];
  onEditConducteur: (conducteur: Conducteur) => void;
  onDeleteConducteur: (id: string) => void;
  onViewConducteur: (conducteur: Conducteur) => void;
}

export function ConducteurTable({ conducteurs, onEditConducteur, onDeleteConducteur, onViewConducteur }: ConducteurTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Prénom</TableHead>
          <TableHead>Permis</TableHead>
          <TableHead>Expérience</TableHead>
          <TableHead>Disponibilité</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Validité Permis</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {conducteurs.map((conducteur) => (
          <TableRow 
            key={conducteur.conducteurId}
            className={!conducteur.permisValide ? 'bg-red-100' : ''}
          >
            <TableCell>{conducteur.nom}</TableCell>
            <TableCell>{conducteur.prenom}</TableCell>
            <TableCell>
              {conducteur.categoriePermis} - {conducteur.numeroPermis}
            </TableCell>
            <TableCell>{conducteur.anneeExperience} ans</TableCell>
            <TableCell>{conducteur.disponibilite}</TableCell>
            <TableCell>{conducteur.statut}</TableCell>
            <TableCell>{formatDate(conducteur.dateValiditePermis)}</TableCell>
            <TableCell className="text-right">
            <Button
                variant="outline"
                size="icon"
                className="mr-2"
                onClick={() => onViewConducteur(conducteur)}
                >
                <Eye className="h-4 w-4" />
                <span className="sr-only">Voir les détails</span>
                </Button>
              <Button
                variant="outline"
                size="icon"
                className="mr-2"
                onClick={() => onEditConducteur(conducteur)}
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Modifier</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  if (conducteur.conducteurId) {
                    onDeleteConducteur(conducteur.conducteurId);
                  }
                }}
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

export default ConducteurTable;