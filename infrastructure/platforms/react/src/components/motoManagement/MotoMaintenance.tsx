import React from 'react';

interface MaintenanceEntry {
  date: string;
  description: string;
  kilometrage: number;
}

interface MotoMaintenanceProps {
  maintenance: MaintenanceEntry[];
  onAdd: (entry: MaintenanceEntry) => void;
  onClose: () => void;
}

function MotoMaintenance({ maintenance, onAdd, onClose }: MotoMaintenanceProps) {
  const [formData, setFormData] = React.useState({
    date: '',
    description: '',
    kilometrage: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ date: '', description: '', kilometrage: 0 });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Planification des entretiens</h2>
      <ul className="space-y-2">
        {maintenance.map((entry, index) => (
          <li key={index} className="border-b py-2">
            <p>Date : {entry.date}</p>
            <p>Description : {entry.description}</p>
            <p>Kilométrage : {entry.kilometrage} km</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="mt-4">
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
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg"
          >
            Fermer
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
}

export default MotoMaintenance;
