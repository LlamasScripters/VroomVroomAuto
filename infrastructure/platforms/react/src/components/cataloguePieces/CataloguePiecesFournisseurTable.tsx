// infrastructure/platforms/react/src/components/cataloguePieces/CataloguePiecesFournisseurTable.tsx
import { PieceFournisseur } from '../../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Info } from 'lucide-react';
import { useState } from 'react';
import { useCommandeStore } from '../../stores/commandeStore';
import { PieceFournisseurDetailsView } from '../cataloguePieces/PieceFournisseurDetailsView';
import { toast } from 'react-hot-toast';

interface CataloguePiecesFournisseurTableProps {
    pieces: PieceFournisseur[];
    showAddToCart?: boolean;
}

export function CataloguePiecesFournisseurTable({ 
    pieces, 
    showAddToCart = false 
}: CataloguePiecesFournisseurTableProps) {
    const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});
    const [selectedPiece, setSelectedPiece] = useState<PieceFournisseur | null>(null);
    const addToPanier = useCommandeStore(state => state.addToPanier);

    const handleQuantityChange = (pieceId: string, value: number, maxQuantite: number) => {
        const quantite = Math.min(Math.max(1, value), maxQuantite);
        setSelectedQuantities(prev => ({ ...prev, [pieceId]: quantite }));
    };

    const handleAddToCart = (piece: PieceFournisseur) => {
        const quantity = selectedQuantities[piece.pieceId] || 1;
        try {
            addToPanier(piece, quantity);
            toast.success(`${piece.nom} ajouté au panier`);
            setSelectedQuantities(prev => ({ ...prev, [piece.pieceId]: 1 }));
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors de l'ajout au panier");
        }
    };

    return (
        <>
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
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pieces.map((piece) => (
                        <TableRow key={piece.pieceId}>
                            <TableCell className="font-medium">{piece.reference}</TableCell>
                            <TableCell>{piece.nom}</TableCell>
                            <TableCell className="max-w-xs truncate">{piece.description}</TableCell>
                            <TableCell>{piece.categorie}</TableCell>
                            <TableCell>{piece.prixUnitaire}€</TableCell>
                            <TableCell>
                                <span className={piece.quantiteEnStock === 0 ? 'text-red-600' : 'text-green-600'}>
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
                                            onChange={(e) => handleQuantityChange(
                                                piece.pieceId,
                                                parseInt(e.target.value),
                                                piece.quantiteEnStock
                                            )}
                                            className="w-16 px-2 py-1 border rounded"
                                            disabled={!piece.disponible}
                                        />
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleAddToCart(piece)}
                                            disabled={!piece.disponible}
                                        >
                                            <Plus className="h-4 w-4 mr-1" />
                                            Ajouter
                                        </Button>
                                    </div>
                                </TableCell>
                            )}
                            <TableCell>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedPiece(piece)}
                                >
                                    <Info className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {selectedPiece && (
                <PieceFournisseurDetailsView
                    piece={selectedPiece}
                    onClose={() => setSelectedPiece(null)}
                />
            )}
        </>
    );
}