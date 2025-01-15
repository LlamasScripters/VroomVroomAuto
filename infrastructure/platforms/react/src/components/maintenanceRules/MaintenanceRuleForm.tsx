// infrastructure/platforms/react/src/components/maintenanceRules/MaintenanceRuleForm.tsx
import React, { useState } from 'react';
import { MaintenanceRule } from '../../types';

interface MaintenanceRuleFormProps {
  onSubmit: (rule: MaintenanceRule) => void;
  onCancel: () => void;
  initialData?: MaintenanceRule;
}

const MaintenanceRuleForm: React.FC<MaintenanceRuleFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
}) => {
  const [formData, setFormData] = useState<MaintenanceRule>(
    initialData || {
      modele: '',
      intervalleKilometrage: 10000,
      intervalleTemps: 365,
      typeEntretien: 'Préventif',
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes('intervalle') ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {initialData ? 'Modifier' : 'Créer'} une règle de maintenance
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Modèle de moto
          </label>
          <input
            type="text"
            name="modele"
            value={formData.modele}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Intervalle kilométrique
          </label>
          <input
            type="number"
            name="intervalleKilometrage"
            value={formData.intervalleKilometrage}
            onChange={handleChange}
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Intervalle temps (jours)
          </label>
          <input
            type="number"
            name="intervalleTemps"
            value={formData.intervalleTemps}
            onChange={handleChange}
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Type d'entretien
          </label>
          <select
            name="typeEntretien"
            value={formData.typeEntretien}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="Préventif">Préventif</option>
            <option value="Curatif">Curatif</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          {initialData ? 'Modifier' : 'Créer'}
        </button>
      </div>
    </form>
  );
};

export default MaintenanceRuleForm;