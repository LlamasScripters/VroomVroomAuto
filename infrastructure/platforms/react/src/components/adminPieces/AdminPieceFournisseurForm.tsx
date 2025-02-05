// infrastructure/platforms/react/src/components/adminPieces/AdminPieceFournisseurForm.tsx
import React, { useState } from 'react';
import { PieceFournisseur } from '../../types';

interface AdminPieceFournisseurFormProps {
    onSubmit: (pieceData: Omit<PieceFournisseur, 'pieceId'>) => Promise<void>;
    onCancel: () => void;
    initialData?: PieceFournisseur;
}

export function AdminPieceFournisseurForm({ 
    onSubmit, 
    onCancel, 
    initialData 
}: AdminPieceFournisseurFormProps) {
    const [formData, setFormData] = useState({
        reference: initialData?.reference || '',
        nom: initialData?.nom || '',
        description: initialData?.description || '',
        categorie: initialData?.categorie || '',
        prixUnitaire: initialData?.prixUnitaire || 0,
        quantiteEnStock: initialData?.quantiteEnStock || 0,
        seuilCritique: initialData?.seuilCritique || 5,
        fournisseur: 'Triumph Motorcycles',
        stockCritique: initialData?.stockCritique || false,
        disponible: initialData?.disponible || true
    });

    const categories = [
        'Filtration',
        'Freinage',
        'Pneumatiques',
        'Moteur',
        'Transmission',
        'Electrique',
        'Carrosserie',
        'Autres'
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-6">
                {initialData ? 'Modifier une pièce' : 'Ajouter une nouvelle pièce'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Référence
                    </label>
                    <input
                        type="text"
                        name="reference"
                        value={formData.reference}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Nom
                    </label>
                    <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Catégorie
                    </label>
                    <select
                        name="categorie"
                        value={formData.categorie}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Sélectionnez une catégorie</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Prix unitaire (€)
                    </label>
                    <input
                        type="number"
                        name="prixUnitaire"
                        value={formData.prixUnitaire}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Quantité en stock
                    </label>
                    <input
                        type="number"
                        name="quantiteEnStock"
                        value={formData.quantiteEnStock}
                        onChange={handleChange}
                        required
                        min="0"
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Seuil critique
                    </label>
                    <input
                        type="number"
                        name="seuilCritique"
                        value={formData.seuilCritique}
                        onChange={handleChange}
                        required
                        min="0"
                        className="w-full p-2 border rounded"
                    />
                </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                >
                    Annuler
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    {initialData ? 'Modifier' : 'Ajouter'}
                </button>
            </div>
        </form>
    );
}