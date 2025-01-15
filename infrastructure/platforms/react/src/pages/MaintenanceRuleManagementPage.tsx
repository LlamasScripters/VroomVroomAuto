import React, { useState, useEffect } from 'react';
import { MaintenanceRule } from '../types';
import { MaintenanceRuleService } from '../services/maintenanceRuleService';
import MaintenanceRuleTable from '../components/maintenanceRules/MaintenanceRuleTable';
import MaintenanceRuleForm from '../components/maintenanceRules/MaintenanceRuleForm';
import { toast } from "react-hot-toast";

const MaintenanceRuleManagementPage: React.FC = () => {
  const [rules, setRules] = useState<MaintenanceRule[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentRule, setCurrentRule] = useState<MaintenanceRule | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedRules = await MaintenanceRuleService.getAllRules();
      setRules(fetchedRules);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
      setError(errorMessage);
      toast.error('Erreur lors de la récupération des règles de maintenance');
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddRule = () => {
    setCurrentRule(null);
    setIsFormVisible(true);
  };

  const handleEditRule = (rule: MaintenanceRule) => {
    setCurrentRule(rule);
    setIsFormVisible(true);
  };

  const handleDeleteRule = async (id: string) => {
    try {
      setError(null);
      await MaintenanceRuleService.deleteRule(id);
      setRules(rules.filter(rule => rule.id !== id));
      toast.success('Règle supprimée avec succès');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
      setError(errorMessage);
      toast.error('Erreur lors de la suppression');
      console.error('Erreur:', error);
    }
  };

  const handleSubmitRule = async (rule: MaintenanceRule) => {
    try {
      setError(null);
      if (rule.id) {
        const updatedRule = await MaintenanceRuleService.updateRule(rule);
        setRules(rules.map(r => r.id === rule.id ? updatedRule : r));
        toast.success('Règle mise à jour avec succès');
      } else {
        const newRule = await MaintenanceRuleService.createRule(rule);
        setRules([...rules, newRule]);
        toast.success('Règle créée avec succès');
      }
      setIsFormVisible(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
      setError(errorMessage);
      toast.error('Erreur lors de la sauvegarde');
      console.error('Erreur:', error);
    }
  };

  return (
    <div className="p-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Règles de maintenance
        </h1>
        <button
          onClick={handleAddRule}
          className="mt-3 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 sm:mt-0"
        >
          Ajouter une règle
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="mt-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <MaintenanceRuleTable
            rules={rules}
            onEditRule={handleEditRule}
            onDeleteRule={handleDeleteRule}
          />
        )}
      </div>

      {isFormVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="max-w-2xl w-full mx-4">
            <MaintenanceRuleForm
              onSubmit={handleSubmitRule}
              onCancel={() => setIsFormVisible(false)}
              initialData={currentRule || undefined}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenanceRuleManagementPage;