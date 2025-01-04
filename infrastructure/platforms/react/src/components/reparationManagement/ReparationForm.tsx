import React, { useState } from 'react';

interface ReparationFormProps {
  onSubmit: (reparation: { id?: string; panneId: string; description: string; date: string; actionsCorrectives: string[] }) => void;
  onCancel: () => void;
  initialData?: {
    id?: string;
    panneId: string;
    description: string;
    date: string;
    actionsCorrectives: string[];
  };
}

function ReparationForm({ onSubmit, onCancel, initialData }: ReparationFormProps) {
  const [formData, setFormData] = useState({
    id: initialData?.id || '',
    panneId: initialData?.panneId || '',
    description: initialData?.description || '',
    date: initialData?.date || '',
    actionsCorrectives: initialData?.actionsCorrectives || [],
  });

  const [newAction, setNewAction] = useState('');

  const handleAddAction = () => {
    if (newAction.trim()) {
      setFormData({ ...formData, actionsCorrectives: [...formData.actionsCorrectives, newAction.trim()] });
      setNewAction('');
    }
  };

  const handleRemoveAction = (index: number) => {
    setFormData({
      ...formData,
      actionsCorrectives: formData.actionsCorrectives.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{initialData ? 'Modifier une réparation' : 'Ajouter une réparation'}</h2>

      <div className="mb-4">
        <label htmlFor="panneId" className="block text-sm font-medium text-gray-700">ID de la Panne</label>
        <input
          type="text"
          id="panneId"
          name="panneId"
          value={formData.panneId}
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
        <label className="block text-sm font-medium text-gray-700">Actions Correctives</label>
        <ul className="space-y-1">
          {formData.actionsCorrectives.map((action, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span>{action}</span>
              <button
                type="button"
                className="text-red-500"
                onClick={() => handleRemoveAction(index)}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex items-center space-x-2">
          <input
            type="text"
            value={newAction}
            onChange={(e) => setNewAction(e.target.value)}
            className="flex-grow border p-2 rounded"
          />
          <button
            type="button"
            onClick={handleAddAction}
            className="bg-green-500 text-white py-1 px-3 rounded"
          >
            Ajouter
          </button>
        </div>
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

export default ReparationForm;
