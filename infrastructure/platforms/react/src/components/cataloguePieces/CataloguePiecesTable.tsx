// infrastructure/platforms/react/src/components/cataloguePieces/CataloguePiecesTable.tsx
import { PieceFournisseur } from '../../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useCommandeStore } from '../../stores/commandeStore';

interface CataloguePiecesTableProps {
    pieces: PieceFournisseur[];
    showAddToCart?: boolean;
}

export function CataloguePiecesTable({ pieces, showAddToCart = false }: CataloguePiecesTableProps) {
    const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});
    const addToPanier = useCommandeStore(state => state.addToPanier);

    const handleQuantityChange = (pieceId: string, value: number) => {
        setSelectedQuantities(prev => ({ ...prev, [pieceId]: value }));
    };

    const handleAddToCart = (piece: PieceFournisseur) => {
        const quantity = selectedQuantities[piece.pieceId] || 1;
        addToPanier(piece, quantity);
        setSelectedQuantities(prev => ({ ...prev, [piece.pieceId]: 1 }));
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Référence</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Prix unitaire</TableHead>
                    <TableHead>Stock disponible</TableHead>
                    {showAddToCart && <TableHead>Commander</TableHead>}
                </TableRow>
            </TableHeader>
            <TableBody>
                {pieces.map((piece) => (
                    <TableRow key={piece.pieceId}>
                        <TableCell className="font-medium">{piece.reference}</TableCell>
                        <TableCell>{piece.nom}</TableCell>
                        <TableCell>{piece.description}</TableCell>
                        <TableCell>{piece.categorie}</TableCell>
                        <TableCell>{piece.prixUnitaire}€</TableCell>
                        <TableCell>
                            <span className={piece.quantiteEnStock === 0 ? 'text-red-600' : piece.stockCritique ? 'text-orange-600' : 'text-green-600'}>
                                {piece.quantiteEnStock} unités
                            </span>
                        </TableCell>
                        {showAddToCart && (
                            <TableCell>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="number"
                                        min="1"
                                        max={piece.quantiteEnStock}
                                        value={selectedQuantities[piece.pieceId] || 1}
                                        onChange={(e) => handleQuantityChange(piece.pieceId, parseInt(e.target.value))}
                                        className="w-16 px-2 py-1 border rounded"
                                        disabled={piece.quantiteEnStock === 0}
                                    />
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleAddToCart(piece)}
                                        disabled={piece.quantiteEnStock === 0}
                                    >
                                        <Plus className="h-4 w-4 mr-1" />
                                        Commander
                                    </Button>
                                </div>
                            </TableCell>
                        )}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}