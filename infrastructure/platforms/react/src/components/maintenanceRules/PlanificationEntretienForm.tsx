// infrastructure/platforms/react/src/components/maintenanceRules/PlanificationEntretienForm.tsx

import React, { useState, useEffect } from 'react';
import { Moto, MaintenanceRule } from '../../types';
import { MotoService } from '../../services/motoService';
import { MaintenanceRuleService } from '../../services/maintenanceRuleService';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";

interface PlanificationEntretienFormProps {
  onSubmit: (planification: {
    motoId: string;
    datePrevue?: string;
    kilometragePrevu?: number;
    typeEntretien?: string;
    notes?: string;
  }) => void;
  onCancel: () => void;
}

const PlanificationEntretienForm: React.FC<PlanificationEntretienFormProps> = ({
  onSubmit,
}) => {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [maintenanceRules, setMaintenanceRules] = useState<MaintenanceRule[]>([]);
  const [selectedMoto, setSelectedMoto] = useState<Moto | null>(null);
  const [selectedRule, setSelectedRule] = useState<MaintenanceRule | null>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    motoId: '',
    datePrevue: '',
    kilometragePrevu: 0,
    typeEntretien: '',
    notes: ''
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [motosData, rulesData] = await Promise.all([
          MotoService.getAllMotos(),
          MaintenanceRuleService.getAllRules()
        ]);
        setMotos(motosData);
        setMaintenanceRules(rulesData);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (selectedMoto) {
      // Reset selectedRule d'abord
      setSelectedRule(null);
      
      // Chercher la règle correspondante
      const rule = maintenanceRules.find(r => r.modele === selectedMoto.model);
      if (rule) {
        setSelectedRule(rule);
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + rule.intervalleTemps);
        
        setFormData(prev => ({
          ...prev,
          typeEntretien: rule.typeEntretien,
          datePrevue: nextDate.toISOString().split('T')[0],
          kilometragePrevu: selectedMoto.kilometrage + rule.intervalleKilometrage
        }));
      }
    }
  }, [selectedMoto, maintenanceRules]);

  const handleMotoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const moto = motos.find(m => m.motoId === e.target.value);
    setSelectedMoto(moto || null);
    setFormData(prev => ({
      ...prev,
      motoId: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRule) {
      toast.error("Une règle de maintenance est requise pour planifier l'entretien");
      return;
    }
  
    if (selectedMoto && formData.kilometragePrevu <= selectedMoto.kilometrage) {
      toast.error("Le kilométrage prévu doit être supérieur au kilométrage actuel");
      return;
    }
  
    onSubmit(formData);
  };

  const handleCancel = () => {
    navigate('/entretiens'); // ou le chemin approprié
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Planifier un entretien</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sélectionner une moto
          </label>
          <select
            value={formData.motoId}
            onChange={handleMotoChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          >
            <option value="">Sélectionnez une moto</option>
            {motos.map((moto) => (
              <option key={moto.motoId} value={moto.motoId}>
                {moto.marque} {moto.model} - {moto.serialNumber}
              </option>
            ))}
          </select>
        </div>

        {selectedMoto && selectedRule ? (
          <div className="bg-blue-50 p-4 rounded-md mb-4">
            <h3 className="font-medium text-blue-900">Règle de maintenance applicable</h3>
            <p>Intervalle kilométrique: {selectedRule.intervalleKilometrage} km</p>
            <p>Intervalle temps: {selectedRule.intervalleTemps} jours</p>
          </div>
        ) : selectedMoto && (
          <div className="bg-yellow-50 p-4 rounded-md mb-4">
            <h3 className="font-medium text-yellow-900">Attention</h3>
            <p>Aucune règle de maintenance n'est définie pour ce modèle de moto.</p>
            <p> Veuillez d'abord créer une règle de maintenance afin de planifier l'entretien de la moto sélectionnée.</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date prévue
          </label>
          <input
            type="date"
            value={formData.datePrevue}
            onChange={(e) => setFormData(prev => ({...prev, datePrevue: e.target.value}))}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
            disabled={!selectedRule}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Kilométrage prévu
          </label>
          <input
            type="number"
            value={formData.kilometragePrevu}
            onChange={(e) => setFormData(prev => ({...prev, kilometragePrevu: parseInt(e.target.value)}))}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Notes du technicien
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({...prev, notes: e.target.value}))}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            rows={3}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Type d'entretien
        </label>
        <select
          value={formData.typeEntretien}
          onChange={(e) => setFormData(prev => ({...prev, typeEntretien: e.target.value}))}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          required
          disabled={!selectedRule}
        >
          <option value="">Sélectionner un type</option>
          <option value="Préventif">Préventif</option>
          <option value="Curatif">Curatif</option>
        </select>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Planifier
        </button>
      </div>
    </form>
  );
};

export default PlanificationEntretienForm;