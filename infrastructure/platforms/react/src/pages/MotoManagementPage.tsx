// infrastructure/platforms/react/src/pages/MotoManagementPage.tsx

import { useState, useEffect } from 'react';
import MotoTable from '../components/motoManagement/MotoTable';
import MotoForm from '../components/motoManagement/MotoForm';
import MotoHistory from '../components/motoManagement/MotoHistory';
import MotoMaintenance from '../components/motoManagement/MotoMaintenance';
import { MotoService } from '../services/motoService';
import { Moto } from '../types';
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'

export default function MotoManagementPage() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedMoto, setSelectedMoto] = useState<Moto | null>(null);
  const [showMaintenance, setShowMaintenance] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Chargement initial des motos
  useEffect(() => {
    loadMotos();
  }, []);

  const loadMotos = async () => {
    try {
      setLoading(true);
      const data = await MotoService.getAllMotos();
      setMotos(data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des motos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMoto = async (motoData: Omit<Moto, 'id'>) => {
    try {
      const newMoto = await MotoService.createMoto(motoData);
      setMotos([...motos, newMoto]);
      setShowAddForm(false);
      setError(null);
    } catch (err) {
      setError('Erreur lors de l\'ajout de la moto');
      console.error(err);
    }
  };

  const handleEditMoto = async (motoData: Moto) => {
    try {
      const updatedMoto = await MotoService.updateMoto(motoData);
      setMotos(motos.map(moto => moto.motoId === updatedMoto.motoId ? updatedMoto : moto));
      setSelectedMoto(null);
      setError(null);
    } catch (err) {
      setError('Erreur lors de la mise à jour de la moto');
      console.error(err);
    }
  };

  const handleDeleteMoto = async (motoId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette moto ?')) {
      return;
    }

    try {
      await MotoService.deleteMoto(motoId);
      setMotos(motos.filter(moto => moto.motoId !== motoId));
      setError(null);
    } catch (err) {
      setError('Erreur lors de la suppression de la moto');
      console.error(err);
    }
  };

  const handleShowMaintenance = (moto: Moto) => {
    setSelectedMoto(moto);
    setShowMaintenance(true);
  };

  const handleShowHistory = (moto: Moto) => {
    setSelectedMoto(moto);
    setShowHistory(true);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Motos</h1>
        <Button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Ajouter une moto
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-4">Chargement...</div>
      ) : (
        <MotoTable
          motos={motos}
          onEditMoto={(moto) => setSelectedMoto(moto)}
          onShowMaintenance={handleShowMaintenance}
          onShowHistory={handleShowHistory}
          onDeleteMoto={handleDeleteMoto}
        />
      )}

      {(showAddForm || selectedMoto) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <MotoForm
              initialData={selectedMoto || undefined}
              onSubmit={selectedMoto ? handleEditMoto : handleAddMoto}
              onCancel={() => {
                setShowAddForm(false);
                setSelectedMoto(null);
              }}
            />
          </div>
        </div>
      )}

      {showMaintenance && selectedMoto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <MotoMaintenance
              maintenance={[]} // À implémenter avec le vrai service de maintenance
              onAdd={(entry) => {
                console.log('Ajout maintenance:', entry);
                // À implémenter avec le vrai service de maintenance
              }}
              onClose={() => {
                setShowMaintenance(false);
                setSelectedMoto(null);
              }}
            />
          </div>
        </div>
      )}

      {showHistory && selectedMoto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <MotoHistory
              history={[]} // À implémenter avec le vrai service d'historique
            />
            <div className="flex justify-end p-4">
              <Button
                onClick={() => {
                  setShowHistory(false);
                  setSelectedMoto(null);
                }}
              >
                Fermer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}