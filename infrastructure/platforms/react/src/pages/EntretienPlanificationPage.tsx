import React, { useState } from 'react';
import { MaintenanceRuleService } from '../services/maintenanceRuleService';
import PlanificationEntretienForm from '../components/maintenanceRules/PlanificationEntretienForm';
import { toast } from "react-hot-toast";

interface PlanificationData {
  motoId: string;
  datePrevue?: string;
  kilometragePrevu?: number;
  typeEntretien?: string;
  notes?: string;
}

const EntretienPlanificationPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlanification = async (planificationData: PlanificationData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await MaintenanceRuleService.planifierEntretien(planificationData);
      
      toast.success('Entretien planifié avec succès');
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
      setError(errorMessage);
      toast.error('Erreur lors de la planification de l\'entretien');
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Planification des Entretiens</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <PlanificationEntretienForm
            onSubmit={handlePlanification}
            onCancel={() => {/* gérer l'annulation */}}
          />
        </div>
      )}
    </div>
  );
};

export default EntretienPlanificationPage;
