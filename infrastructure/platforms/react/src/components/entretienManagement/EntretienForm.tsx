import React, { useState } from 'react';

interface EntretienFormProps {
  onSubmit: (entretien: { id?: string; motoId: string; type: string; description: string; date: string; status: string }) => void;
  onCancel: () => void;
  initialData?: {
    id?: string;
    motoId: string;
    type: string;
    description: string;
    date: string;
    status: string;
  };
}

function EntretienForm({ onSubmit, onCancel, initialData }: EntretienFormProps) {
  const [formData, setFormData] = useState({
    id: initialData?.id || '',
    motoId: initialData?.motoId || '',
    type: initialData?.type || 'Préventif',
    description: initialData?.description || '',
    date: initialData?.date || '',
    status: initialData?.status || 'En cours',
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
      <h2 className="text-xl font-bold mb-4">{initialData ? 'Modifier un entretien' : 'Ajouter un entretien'}</h2>

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
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="Préventif">Préventif</option>
          <option value="Curatif">Curatif</option>
        </select>
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
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
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
          <option value="En cours">En cours</option>
          <option value="Terminé">Terminé</option>
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

export default EntretienForm;
