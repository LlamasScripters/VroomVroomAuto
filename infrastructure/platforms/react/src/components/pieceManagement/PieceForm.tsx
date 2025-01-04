import React, { useState } from 'react';
import { Piece } from '../../types';

interface PieceFormProps {
  onSubmit: (piece: Piece) => void;
  onCancel: () => void;
  initialData?: Piece;
}

function PieceForm({ onSubmit, onCancel, initialData }: PieceFormProps) {
  const [formData, setFormData] = useState<Piece>({
    id: initialData?.id || '',
    nom: initialData?.nom || '',
    reference: initialData?.reference || '',
    quantiteEnStock: initialData?.quantiteEnStock || 0,
    seuilCritique: initialData?.seuilCritique || 0,
    categorie: initialData?.categorie || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{initialData ? 'Modifier une pièce' : 'Ajouter une pièce'}</h2>
      
      <div className="mb-4">
        <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom</label>
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
        <label htmlFor="reference" className="block text-sm font-medium text-gray-700">Référence</label>
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
        <label htmlFor="quantiteEnStock" className="block text-sm font-medium text-gray-700">Quantité en stock</label>
        <input
          type="number"
          id="quantiteEnStock"
          name="quantiteEnStock"
          value={formData.quantiteEnStock}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="seuilCritique" className="block text-sm font-medium text-gray-700">Seuil critique</label>
        <input
          type="number"
          id="seuilCritique"
          name="seuilCritique"
          value={formData.seuilCritique}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="categorie" className="block text-sm font-medium text-gray-700">Catégorie</label>
        <input
          type="text"
          id="categorie"
          name="categorie"
          value={formData.categorie}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white py-2 px-4 rounded-lg"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          {initialData ? 'Modifier' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
}

export default PieceForm;
