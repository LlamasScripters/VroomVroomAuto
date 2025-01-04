import { Piece } from '../../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from 'lucide-react';

interface PieceTableProps {
  pieces: Piece[];
  onEditPiece: (piece: Piece) => void;
  onDeletePiece: (id: string) => void;
}

export function PieceTable({ pieces, onEditPiece, onDeletePiece }: PieceTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Référence</TableHead>
          <TableHead>Quantité</TableHead>
          <TableHead>Seuil Critique</TableHead>
          <TableHead>Catégorie</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pieces.map((piece) => (
          <TableRow key={piece.id} className={piece.quantiteEnStock < piece.seuilCritique ? 'bg-red-100' : ''}>
            <TableCell>{piece.nom}</TableCell>
            <TableCell>{piece.reference}</TableCell>
            <TableCell>{piece.quantiteEnStock}</TableCell>
            <TableCell>{piece.seuilCritique}</TableCell>
            <TableCell>{piece.categorie}</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="icon" className="mr-2" onClick={() => onEditPiece(piece)}>
                <Edit className="h-4 w-4" />
                <span className="sr-only">Modifier</span>
              </Button>
              <Button variant="outline" size="icon" onClick={() => onDeletePiece(piece.id!)}>
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

export default PieceTable;
