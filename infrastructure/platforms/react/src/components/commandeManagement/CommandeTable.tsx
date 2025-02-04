// infrastructure/platforms/react/src/components/commandeManagement/CommandeTable.tsx
import { Commande } from '../../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash2 } from 'lucide-react';

interface CommandeTableProps {
  commandes: Commande[];
  onEditCommande: (commande: Commande) => void;
  onDeleteCommande: (id: string) => void;
  onViewCommande?: (commande: Commande) => void;
  readOnly?: boolean;
}

export function CommandeTable({
  commandes,
  onEditCommande,
  onDeleteCommande,
  onViewCommande,
  readOnly = false
}: CommandeTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Référence Pièce</TableHead>
          <TableHead>Nom Pièce</TableHead>
          <TableHead>Quantité</TableHead>
          <TableHead>Prix unitaire</TableHead>
          <TableHead>Coût total</TableHead>
          <TableHead>Date de commande</TableHead>
          <TableHead>Livraison prévue</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {commandes.map((commande) => (
          <TableRow key={commande.commandeId}>
            <TableCell>{commande.pieceDetails?.reference || '-'}</TableCell>
            <TableCell>{commande.pieceDetails?.nom || '-'}</TableCell>
            <TableCell>{commande.quantiteCommandee}</TableCell>
            <TableCell>{commande.pieceDetails?.prixUnitaire ? `${commande.pieceDetails.prixUnitaire}€` : '-'} €</TableCell>
            <TableCell>{commande.coutTotal}€</TableCell>
            <TableCell>{new Date(commande.dateCommande).toLocaleDateString()}</TableCell>
            <TableCell>{new Date(commande.dateLivraisonPrevue).toLocaleDateString()}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-sm ${
                commande.statut === 'LIVREE' ? 'bg-green-100 text-green-800' :
                commande.statut === 'EN_COURS' ? 'bg-blue-100 text-blue-800' :
                commande.statut === 'EN_ATTENTE' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {commande.statut}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="outline"
                size="icon"
                className="mr-2"
                onClick={() => onViewCommande && onViewCommande(commande)}
              >
                <Eye className="h-4 w-4" />
                <span className="sr-only">Voir</span>
              </Button>
              {!readOnly && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="mr-2"
                    onClick={() => onEditCommande(commande)}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Modifier</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onDeleteCommande(commande.commandeId)}
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