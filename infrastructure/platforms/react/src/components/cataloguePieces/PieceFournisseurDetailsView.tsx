// infrastructure/platforms/react/src/components/cataloguePieces/PieceFournisseurDetailsView.tsx
import { PieceFournisseur } from '../../types';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

interface PieceFournisseurDetailsViewProps {
    piece: PieceFournisseur;
    onClose: () => void;
}

export function PieceFournisseurDetailsView({ piece, onClose }: PieceFournisseurDetailsViewProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-2xl font-bold">Détails de la pièce</h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-6 w-6" />
                    </Button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Informations générales</h3>
                            <div className="space-y-2">
                                <p><span className="font-medium">Référence:</span> {piece.reference}</p>
                                <p><span className="font-medium">Nom:</span> {piece.nom}</p>
                                <p><span className="font-medium">Catégorie:</span> {piece.categorie}</p>
                                <p><span className="font-medium">Prix unitaire:</span> {piece.prixUnitaire}€</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Stock</h3>
                            <div className="space-y-2">
                                <p><span className="font-medium">Quantité disponible:</span> {piece.quantiteEnStock}</p>
                                <p><span className="font-medium">Statut:</span>
                                    <span className={`ml-2 px-2 py-1 rounded-full text-sm ${
                                        piece.disponible 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {piece.disponible ? 'Disponible' : 'Indisponible'}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Description</h3>
                        <p className="text-gray-700">{piece.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}