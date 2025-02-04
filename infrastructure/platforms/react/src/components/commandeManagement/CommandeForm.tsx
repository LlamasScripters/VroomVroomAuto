// infrastructure/platforms/react/src/components/commandeManagement/CommandeForm.tsx

import React, { useState, useEffect } from 'react';
import { PieceService } from '../../services/pieceService';
import { Button } from "@/components/ui/button";
import { Piece } from '../../types';

interface PieceForm {
    pieceId: string;
    nom: string;
    reference: string;
    quantiteEnStock: number;
    prixUnitaire?: number;
}

interface CommandeFormProps {
    onSubmit: (commande: {
        pieceId: string;
        quantiteCommandee: number;
        dateLivraisonPrevue: string;
    }) => void;
    onCancel: () => void;
    initialData?: {
        pieceId: string;
        quantiteCommandee: number;
        dateLivraisonPrevue: string;
    };
}

export function CommandeForm({ onSubmit, onCancel, initialData }: CommandeFormProps) {
    const [pieces, setPieces] = useState<PieceForm[]>([]);
    const [formData, setFormData] = useState({
        pieceId: initialData?.pieceId || '',
        quantiteCommandee: initialData?.quantiteCommandee || 1,
        dateLivraisonPrevue: initialData?.dateLivraisonPrevue || '',
    });
    const [selectedPiece, setSelectedPiece] = useState<PieceForm | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPieces = async () => {
            try {
                const fetchedData = await PieceService.getAllPieces();
                const transformedPieces = fetchedData
                    .filter((piece: Piece): piece is Piece => 
                        piece.pieceId !== undefined &&
                        typeof piece.nom === 'string' &&
                        typeof piece.reference === 'string' &&
                        typeof piece.quantiteEnStock === 'number'
                    )
                    .map((piece: Piece): PieceForm => ({
                        pieceId: piece.pieceId as string,
                        nom: piece.nom,
                        reference: piece.reference,
                        quantiteEnStock: piece.quantiteEnStock,
                        prixUnitaire: piece.prixUnitaire
                    }));

                setPieces(transformedPieces);

                if (initialData?.pieceId) {
                    const piece = transformedPieces.find(p => p.pieceId === initialData.pieceId);
                    if (piece) {
                        setSelectedPiece(piece);
                    }
                }
            } catch (error) {
                console.error('Erreur lors du chargement des pièces:', error);
                setError("Erreur lors du chargement des pièces");
            }
        };

        fetchPieces();
    }, [initialData?.pieceId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'pieceId') {
            const piece = pieces.find(p => p.pieceId === value);
            setSelectedPiece(piece || null);
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!selectedPiece) {
            setError("Veuillez sélectionner une pièce");
            return;
        }

        try {
            const disponible = await PieceService.verifierDisponibilite(
                formData.pieceId,
                formData.quantiteCommandee
            );

            if (!disponible) {
                setError("La quantité demandée n'est pas disponible en stock");
                return;
            }

            onSubmit(formData);
        } catch (error) {
            console.error('Erreur lors de la vérification de la disponibilité:', error);
            setError("Erreur lors de la vérification de la disponibilité");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4">
                {initialData ? 'Modifier une commande' : 'Nouvelle commande'}
            </h2>

            {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pièce
                    </label>
                    <select
                        name="pieceId"
                        value={formData.pieceId}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="">Sélectionnez une pièce</option>
                        {pieces.map(piece => (
                            <option key={piece.pieceId} value={piece.pieceId}>
                                {piece.reference} - {piece.nom} 
                                {piece.prixUnitaire ? ` (${piece.prixUnitaire}€)` : ''}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedPiece && (
                    <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm text-gray-600">Stock disponible: {selectedPiece.quantiteEnStock}</p>
                        {selectedPiece.prixUnitaire && (
                            <p className="text-sm text-gray-600">
                                Prix unitaire: {selectedPiece.prixUnitaire}€
                            </p>
                        )}
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantité
                    </label>
                    <input
                        type="number"
                        name="quantiteCommandee"
                        value={formData.quantiteCommandee}
                        onChange={handleChange}
                        min="1"
                        required
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date de livraison prévue
                    </label>
                    <input
                        type="date"
                        name="dateLivraisonPrevue"
                        value={formData.dateLivraisonPrevue}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                {selectedPiece && selectedPiece.prixUnitaire && (
                    <div className="bg-blue-50 p-4 rounded-md">
                        <p className="font-medium">
                            Coût total estimé: {(selectedPiece.prixUnitaire * formData.quantiteCommandee).toFixed(2)}€
                        </p>
                    </div>
                )}
            </div>

            <div className="flex justify-end space-x-4 mt-6">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                >
                    Annuler
                </Button>
                <Button
                    type="submit"
                    variant="default"
                >
                    {initialData ? 'Modifier' : 'Commander'}
                </Button>
            </div>
        </form>
    );
}

export default CommandeForm;