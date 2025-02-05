// infrastructure/platforms/react/src/components/pieceManagement/PieceTable.tsx
import { Piece } from '../../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash2, Plus } from 'lucide-react';
import { useState } from 'react';
import { useCommandeStore } from '../../stores/commandeStore';

interface PieceTableProps {
  pieces: Piece[];
  onEditPiece: (piece: Piece) => void;
  onDeletePiece: (id: string) => void;
  onViewPiece?: (piece: Piece) => void;
  readOnly?: boolean;
  showAddToCart?: boolean;
}

export function PieceTable({ 
  pieces, 
  onEditPiece, 
  onDeletePiece,
  onViewPiece,
  readOnly = false,
  showAddToCart = false
}: PieceTableProps) {

  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});
  const addToPanier = useCommandeStore(state => state.addToPanier);

  const handleQuantityChange = (pieceId: string, value: number) => {
    setSelectedQuantities(prev => ({ ...prev, [pieceId]: value }));
  };

  const handleAddToCart = (piece: Piece) => {
    const quantity = selectedQuantities[piece.pieceId!] || 1;
    addToPanier(piece, quantity);
    setSelectedQuantities(prev => ({ ...prev, [piece.pieceId!]: 1 }));
  };


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
          {showAddToCart && <TableHead>Ajouter au panier</TableHead>}
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
            {showAddToCart && (
              <TableCell>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="1"
                    value={selectedQuantities[piece.pieceId!] || 1}
                    onChange={(e) => handleQuantityChange(piece.pieceId!, parseInt(e.target.value))}
                    className="w-16 px-2 py-1 border rounded"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddToCart(piece)}
                    disabled={piece.quantiteEnStock === 0}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Ajouter
                  </Button>
                </div>
              </TableCell>
            )}
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