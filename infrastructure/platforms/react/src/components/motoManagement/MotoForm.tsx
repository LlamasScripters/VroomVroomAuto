import React, { useState } from 'react';

interface MotoFormProps {
  onSubmit: (moto: { id?: string; model: string; serialNumber: string; kilometrage: number; status: string }) => void;
  onCancel: () => void;
  initialData?: {
    id?: string;
    model: string;
    serialNumber: string;
    kilometrage: number;
    status: string;
  };
}

function MotoForm({ onSubmit, onCancel, initialData }: MotoFormProps) {
  const [formData, setFormData] = useState({
    model: initialData?.model || '',
    serialNumber: initialData?.serialNumber || '',
    kilometrage: initialData?.kilometrage || 0,
    status: initialData?.status || 'OK',
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
      <h2 className="text-xl font-bold mb-4">{initialData ? 'Modifier la moto' : 'Ajouter une moto'}</h2>

      <div className="mb-4">
        <label htmlFor="model" className="block text-sm font-medium text-gray-700">Modèle</label>
        <input
          type="text"
          id="model"
          name="model"
          value={formData.model}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700">N° Série</label>
        <input
          type="text"
          id="serialNumber"
          name="serialNumber"
          value={formData.serialNumber}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="kilometrage" className="block text-sm font-medium text-gray-700">Kilométrage</label>
        <input
          type="number"
          id="kilometrage"
          name="kilometrage"
          value={formData.kilometrage}
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
          <option value="OK">OK</option>
          <option value="Entretien dû">Entretien dû</option>
          <option value="En panne">En panne</option>
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

export default MotoForm;
