import { useAuthStore } from '@/stores/authStore';
import React, { useState, useEffect } from 'react';
import { validateTriumphVIN, formatVIN } from '../../utils/vinValidator';
import { AlertCircle } from 'lucide-react';
import axios from 'axios';

interface User {
  userId: string;
  email: string;
  username: string;
}

interface MotoFormProps {
  onSubmit: (moto: {
    motoId?: string;
    marque: string;
    model: string;      
    serialNumber: string;
    kilometrage: number;
    dateMiseEnService: string;
    statut: string;
    userId?: string;     
  }) => void;
  onCancel: () => void;
  initialData?: {
    motoId?: string;
    marque: string;
    model: string;
    serialNumber: string;
    kilometrage: number;
    dateMiseEnService: string;
    statut: string;
    userId?: string;
  };
}


function MotoForm({ onSubmit, onCancel, initialData }: MotoFormProps) {

  const { user } = useAuthStore();
  const [users, setUsers] = useState<User[]>([]);
  const [vinError, setVinError] = useState<string>('');

  const [formData, setFormData] = useState({
    motoId: initialData?.motoId || '',
    marque: initialData?.marque || '',
    model: initialData?.model || '', 
    serialNumber: initialData?.serialNumber || '',
    kilometrage: initialData?.kilometrage || 0,
    dateMiseEnService: initialData?.dateMiseEnService || '',
    statut: initialData?.statut || 'En service',
    userId: initialData?.userId || user?.id || '',
  });

  useEffect(() => {
    const loadUsers = async () => {
      if (user?.role === 'admin') {
        try {
          const response = await axios.get('/user');
            

          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error('Erreur lors du chargement des utilisateurs:', error);
        }
      }
    };
    loadUsers();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'serialNumber') {
      const formattedVIN = formatVIN(value);
      
      const vinValidationError = validateTriumphVIN(formattedVIN);
      if (vinValidationError) {
          setVinError(vinValidationError);
      } else {
          setVinError('');
      }
      
      setFormData({ ...formData, [name]: formattedVIN });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.kilometrage < 0) {
      alert("Le kilométrage ne peut pas être négatif.");
      return;
    }
    if (!validateTriumphVIN(formData.serialNumber)) {
      alert("Le numéro VIN n'est pas valide pour une moto Triumph.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{initialData ? 'Modifier la moto' : 'Ajouter une moto'}</h2>
      
      <div className="mb-4">
        <label htmlFor="marque" className="block text-sm font-medium text-gray-700">Marque</label>
        <input
          type="text"
          id="marque"
          name="marque"
          value="Triumph"
          readOnly
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
        />
      </div>

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
        <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700">
          N° VIN Triumph
        </label>
        <input
          type="text"
          id="serialNumber"
          name="serialNumber"
          value={formData.serialNumber}
          onChange={handleChange}
          maxLength={17}
          required
          className={`mt-1 block w-full p-2 border ${
            vinError ? 'border-red-500' : 'border-gray-300'
          } rounded-lg`}
          placeholder="SMT..."
        />
        {vinError && (
          <div className="flex items-center mt-1 text-sm text-red-600">
            <AlertCircle className="h-4 w-4 mr-1" />
            {vinError}
          </div>
        )}
        <p className="mt-1 text-sm text-gray-500">
          Le numéro VIN doit commencer par SMT et contenir 17 caractères
        </p>
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
        <label htmlFor="dateMiseEnService" className="block text-sm font-medium text-gray-700">Date de mise en service</label>
        <input
          type="date"
          id="dateMiseEnService"
          name="dateMiseEnService"
          value={formData.dateMiseEnService}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {user?.role === 'admin' && (
      <div className="mb-4">
      <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
        Propriétaire de la moto
      </label>
      <select
        id="userId"
        name="userId"
        value={formData.userId}
        onChange={handleChange}
        required
        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
      >
        <option value="">Sélectionnez un propriétaire</option>
        {users.map((user) => (
          <option key={user.userId} value={user.userId}>
            {user.username} ({user.email})
          </option>
        ))}
      </select>
    </div>
      )}

      {/* Si l'utilisateur n'est pas admin, on ajoute un champ caché avec son ID */}
      {user?.role !== 'admin' && (
        <input
          type="hidden"
          name="userId"
          value={user?.id || ''}
        />
      )}

      <div className="mb-4">
        <label htmlFor="statut" className="block text-sm font-medium text-gray-700">Statut</label>
        <select
          id="statut"
          name="statut"
          value={formData.statut}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="En service">En service</option>
          <option value="Hors service">Hors service</option>
          <option value="En essai">En essai</option>
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
