// infrastructure/platforms/react/src/components/pieceManagement/PieceForm.tsx
import React, { useState } from 'react';

interface PieceFormProps {
  onSubmit: (piece: {
    nom: string;
    reference: string;
    quantiteEnStock: number;
    seuilCritique: number;
    categorie: string;
    fournisseur?: string;
    prixUnitaire?: number;
  }) => void;
  onCancel: () => void;
  initialData?: {
    nom: string;
    reference: string;
    quantiteEnStock: number;
    seuilCritique: number;
    categorie: string;
    fournisseur?: string;
    prixUnitaire?: number;
  };
}

const categories = [
  'Filtration',
  'Freinage',
  'Pneumatiques',
  'Moteur',
  'Transmission',
  'Électrique',
  'Carrosserie',
  'Autres'
];

export function PieceForm({ onSubmit, onCancel, initialData }: PieceFormProps) {
  const [formData, setFormData] = useState({
    nom: initialData?.nom || '',
    reference: initialData?.reference || '',
    quantiteEnStock: initialData?.quantiteEnStock || 0,
    seuilCritique: initialData?.seuilCritique || 0,
    categorie: initialData?.categorie || '',
    fournisseur: initialData?.fournisseur || '',
    prixUnitaire: initialData?.prixUnitaire || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const processedValue = type === 'number' ? parseFloat(value) : value;
    setFormData(prev => ({ ...prev, [name]: processedValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">
        {initialData ? 'Modifier une pièce' : 'Ajouter une pièce'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="reference" className="block text-sm font-medium text-gray-700">
            Référence
          </label>
          <input
            type="text"
            id="reference"
            name="reference"
            value={formData.reference}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
            Nom
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="categorie" className="block text-sm font-medium text-gray-700">
            Catégorie
          </label>
          <select
            id="categorie"
            name="categorie"
            value={formData.categorie}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Sélectionnez une catégorie</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="quantiteEnStock" className="block text-sm font-medium text-gray-700">
            Quantité en stock
          </label>
          <input
            type="number"
            id="quantiteEnStock"
            name="quantiteEnStock"
            value={formData.quantiteEnStock}
            onChange={handleChange}
            min="0"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="seuilCritique" className="block text-sm font-medium text-gray-700">
            Seuil critique
          </label>
          <input
            type="number"
            id="seuilCritique"
            name="seuilCritique"
            value={formData.seuilCritique}
            onChange={handleChange}
            min="0"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="prixUnitaire" className="block text-sm font-medium text-gray-700">
            Prix unitaire (€)
          </label>
          <input
            type="number"
            id="prixUnitaire"
            name="prixUnitaire"
            value={formData.prixUnitaire}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="fournisseur" className="block text-sm font-medium text-gray-700">
            Fournisseur
          </label>
          <input
            type="text"
            id="fournisseur"
            name="fournisseur"
            value={formData.fournisseur}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {initialData ? 'Modifier' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
}