import React, { useState } from 'react';

interface EmployeFormProps {
  onSubmit: (employe: { id?: string; nom: string; prenom: string; mail: string; telephone: string; dateCreation: Date; derniereConnexion: Date; role: string}) => void;
  onCancel: () => void;
  initialData?: {
    id?: string;
    nom: string;
    prenom: string;
    mail: string;
    telephone: string;
    dateCreation: Date;
    derniereConnexion: Date;
    role: string;
  };
}

function EmployeForm({ onSubmit, onCancel, initialData }: EmployeFormProps) {
  const [formData, setFormData] = useState({
    id: initialData?.id || '',
    nom: initialData?.nom || '',
    prenom: initialData?.prenom || '',
    mail: initialData?.mail || '',
    telephone: initialData?.telephone || '',
    dateCreation: initialData?.dateCreation || new Date(),
    derniereConnexion: initialData?.derniereConnexion || new Date(),
    role: initialData?.role || '',
  });

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
      <h2 className="text-xl font-bold mb-4">{initialData ? 'Modifier un employé' : 'Ajouter un employé'}</h2>

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
        <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">Prenom</label>
        <input
          type="text"
          id="prenom"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="mail" className="block text-sm font-medium text-gray-700">Mail</label>
        <input
          type="email"
          id="mail"
          name="mail"
          value={formData.mail}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Telephone</label>
        <input
          type="tel"
          maxLength={10}
          minLength={9}
          id="telephone"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
        <input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
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

export default EmployeForm;
