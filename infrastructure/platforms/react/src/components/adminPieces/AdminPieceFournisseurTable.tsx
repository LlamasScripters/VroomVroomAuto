// infrastructure/platforms/react/src/components/adminPieces/AdminPieceFournisseurTable.tsx
import { PieceFournisseur } from '../../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from 'lucide-react';

interface AdminPieceFournisseurTableProps {
    pieces: PieceFournisseur[];
    onEditPiece: (piece: PieceFournisseur) => void;
    onDeletePiece: (id: string) => void;
}

export function AdminPieceFournisseurTable({ 
    pieces, 
    onEditPiece, 
    onDeletePiece 
}: AdminPieceFournisseurTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Référence</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Prix unitaire</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Seuil critique</TableHead>
                    <TableHead>État du stock</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {pieces.map((piece) => (
                    <TableRow 
                        key={piece.pieceId}
                        className={piece.stockCritique ? 'bg-red-50' : ''}
                    >
                        <TableCell className="font-medium">{piece.reference}</TableCell>
                        <TableCell>{piece.nom}</TableCell>
                        <TableCell className="max-w-xs truncate">
                            {piece.description}
                        </TableCell>
                        <TableCell>{piece.categorie}</TableCell>
                        <TableCell>{piece.prixUnitaire}€</TableCell>
                        <TableCell>{piece.quantiteEnStock}</TableCell>
                        <TableCell>{piece.seuilCritique}</TableCell>
                        <TableCell>
                            <span className={`inline-block px-2 py-1 rounded-full text-sm ${
                                piece.quantiteEnStock === 0 
                                    ? 'bg-red-100 text-red-800' 
                                    : piece.stockCritique 
                                        ? 'bg-orange-100 text-orange-800' 
                                        : 'bg-green-100 text-green-800'
                            }`}>
                                {piece.quantiteEnStock === 0 
                                    ? 'Rupture' 
                                    : piece.stockCritique 
                                        ? 'Critique' 
                                        : 'Normal'}
                            </span>
                        </TableCell>
                        <TableCell className="text-right">
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
                                onClick={() => onDeletePiece(piece.pieceId)}
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