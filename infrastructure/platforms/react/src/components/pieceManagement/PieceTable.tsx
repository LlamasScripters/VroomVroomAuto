// infrastructure/platforms/react/src/components/pieceManagement/PieceTable.tsx
import { Piece } from '../../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash2 } from 'lucide-react';

interface PieceTableProps {
  pieces: Piece[];
  onEditPiece: (piece: Piece) => void;
  onDeletePiece: (id: string) => void;
  onViewPiece?: (piece: Piece) => void;
  readOnly?: boolean;
}

export function PieceTable({ 
  pieces, 
  onEditPiece, 
  onDeletePiece,
  onViewPiece,
  readOnly = false 
}: PieceTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Référence</TableHead>
          <TableHead>Nom</TableHead>
          <TableHead>Catégorie</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Seuil critique</TableHead>
          <TableHead>Prix unitaire</TableHead>
          <TableHead>Fournisseur</TableHead>
          <TableHead>État du stock</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pieces.map((piece) => (
          <TableRow key={piece.pieceId} className={piece.stockCritique ? 'bg-red-50' : ''}>
            <TableCell className="font-medium">{piece.reference}</TableCell>
            <TableCell>{piece.nom}</TableCell>
            <TableCell>{piece.categorie}</TableCell>
            <TableCell>{piece.quantiteEnStock}</TableCell>
            <TableCell>{piece.seuilCritique}</TableCell>
            <TableCell>{piece.prixUnitaire ? `${piece.prixUnitaire}€` : '-'}</TableCell>
            <TableCell>{piece.fournisseur || '-'}</TableCell>
            <TableCell>
              <span className={piece.stockCritique ? 'text-red-600 font-medium' : 'text-green-600'}>
                {piece.stockCritique ? 'Critique' : 'Normal'}
              </span>
            </TableCell>
            <TableCell className="text-right">
              {onViewPiece && (
                <Button
                  variant="outline"
                  size="icon"
                  className="mr-2"
                  onClick={() => onViewPiece(piece)}
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
                    onClick={() => onEditPiece(piece)}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Modifier</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onDeletePiece(piece.pieceId!)}
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