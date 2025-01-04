import React, { useState } from 'react';

interface GarantieFormProps {
  onSubmit: (garantie: { id?: string; motoId: string; description: string; dateDebut: string; dateFin: string; status: string }) => void;
  onCancel: () => void;
  initialData?: {
    id?: string;
    motoId: string;
    description: string;
    dateDebut: string;
    dateFin: string;
    status: string;
  };
}

function GarantieForm({ onSubmit, onCancel, initialData }: GarantieFormProps) {
  const [formData, setFormData] = useState({
    id: initialData?.id || '',
    motoId: initialData?.motoId || '',
    description: initialData?.description || '',
    dateDebut: initialData?.dateDebut || '',
    dateFin: initialData?.dateFin || '',
    status: initialData?.status || 'Actif',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{initialData ? 'Modifier une garantie' : 'Ajouter une garantie'}</h2>

      <div className="mb-4">
        <label htmlFor="motoId" className="block text-sm font-medium text-gray-700">ID de la Moto</label>
        <input
          type="text"
          id="motoId"
          name="motoId"
          value={formData.motoId}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700">Date Début</label>
        <input
          type="date"
          id="dateDebut"
          name="dateDebut"
          value={formData.dateDebut}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700">Date Fin</label>
        <input
          type="date"
          id="dateFin"
          name="dateFin"
          value={formData.dateFin}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Statut</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="Actif">Actif</option>
          <option value="Expiré">Expiré</option>
        </select>
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

export default GarantieForm;
