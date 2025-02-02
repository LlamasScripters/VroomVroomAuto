import React, { useState, useEffect } from 'react';
import { Moto } from '../../types';
import { MotoService } from '../../services/motoService';

interface EntretienFormProps {
  onSubmit: (entretien: { 
    motoId: string; 
    typeEntretien: string; 
    datePrevue: string;
    dateRealisee: string;
    kilometrageEntretien: number;
    recommandationsTechnicien: string;
    recommandationsGestionnaireClient: string;
    cout: number;
    statut: string;
    userId: string;
  }) => void;
  onCancel: () => void;
  initialData?: {
    motoId: string;
    typeEntretien: string;
    datePrevue: string;
    dateRealisee: string;
    kilometrageEntretien: number;
    recommandationsTechnicien: string;
    recommandationsGestionnaireClient: string;
    cout: number;
    statut: string;
    userId: string;
  };
}

function EntretienForm({ onSubmit, onCancel, initialData }: EntretienFormProps) {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [formData, setFormData] = useState({
    motoId: initialData?.motoId || '',
    typeEntretien: initialData?.typeEntretien || 'Préventif',
    datePrevue: initialData?.datePrevue ? new Date(initialData.datePrevue).toISOString().split('T')[0] : '',
    dateRealisee: initialData?.dateRealisee ? new Date(initialData.dateRealisee).toISOString().split('T')[0] : '',
    kilometrageEntretien: initialData?.kilometrageEntretien || 0,
    recommandationsTechnicien: initialData?.recommandationsTechnicien || '',
    recommandationsGestionnaireClient: initialData?.recommandationsGestionnaireClient || '',
    cout: initialData?.cout || 0,
    statut: initialData?.statut || 'En cours',
    userId: initialData?.userId || crypto.randomUUID() // Valeur par défaut temporaire, à changer quand on aura mis en place la gestion des utilisateurs
  });

  useEffect(() => {
    const fetchMotos = async () => {
      try {
        const motosData = await MotoService.getAllMotos();
        setMotos(motosData);
      } catch (error) {
        console.error('Erreur lors de la récupération des motos:', error);
      }
    };
    fetchMotos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedValue = e.target.type === 'number' ? parseFloat(value) : value;
    setFormData({ ...formData, [name]: updatedValue });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">
        {initialData ? 'Modifier un entretien' : 'Ajouter un entretien'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="motoId" className="block text-sm font-medium text-gray-700">
            Moto
          </label>
          <select
            id="motoId"
            name="motoId"
            value={formData.motoId}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Sélectionnez une moto</option>
            {motos.map((moto) => (
              <option key={moto.motoId} value={moto.motoId}>
                {moto.marque} {moto.model} - {moto.serialNumber}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="typeEntretien" className="block text-sm font-medium text-gray-700">
            Type d'entretien
          </label>
          <select
            id="typeEntretien"
            name="typeEntretien"
            value={formData.typeEntretien}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="Préventif">Préventif</option>
            <option value="Curatif">Curatif</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="datePrevue" className="block text-sm font-medium text-gray-700">
            Date prévue
          </label>
          <input
            type="date"
            id="datePrevue"
            name="datePrevue"
            value={formData.datePrevue}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="dateRealisee" className="block text-sm font-medium text-gray-700">
            Date réalisée
          </label>
          <input
            type="date"
            id="dateRealisee"
            name="dateRealisee"
            value={formData.dateRealisee}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="kilometrageEntretien" className="block text-sm font-medium text-gray-700">
            Kilométrage
          </label>
          <input
            type="number"
            id="kilometrageEntretien"
            name="kilometrageEntretien"
            value={formData.kilometrageEntretien}
            onChange={handleChange}
            required
            min="0"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cout" className="block text-sm font-medium text-gray-700">
            Coût
          </label>
          <input
            type="number"
            id="cout"
            name="cout"
            value={formData.cout}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4 md:col-span-2">
          <label htmlFor="recommandationsTechnicien" className="block text-sm font-medium text-gray-700">
            Recommandations du technicien
          </label>
          <textarea
            id="recommandationsTechnicien"
            name="recommandationsTechnicien"
            value={formData.recommandationsTechnicien}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4 md:col-span-2">
          <label htmlFor="recommandationsGestionnaireClient" className="block text-sm font-medium text-gray-700">
            Recommandations du gestionnaire
          </label>
          <textarea
            id="recommandationsGestionnaireClient"
            name="recommandationsGestionnaireClient"
            value={formData.recommandationsGestionnaireClient}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="statut" className="block text-sm font-medium text-gray-700">
            Statut
          </label>
          <select
            id="statut"
            name="statut"
            value={formData.statut}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="En cours">En cours</option>
            <option value="Terminé">Terminé</option>
            <option value="Annulé">Annulé</option>
          </select>
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

export default EntretienForm;