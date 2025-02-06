// infrastructure/platforms/react/src/pages/ConducteurManagementPage.tsx
import { useState, useEffect } from 'react';
import ConducteurTable from '../components/conducteurManagement/ConducteurTable';
import ConducteurForm from '../components/conducteurManagement/ConducteurForm';
import { ConducteurDetail } from '../components/conducteurManagement/ConducteurDetail';
import { ConducteurService } from '../services/conducteurService';
import { Conducteur } from '../types';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { Moto } from '../types';

export default function ConducteurManagementPage() {
  const [conducteurs, setConducteurs] = useState<Conducteur[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedConducteurForView, setSelectedConducteurForView] = useState<Conducteur | null>(null);
  const [selectedConducteurMotos, setSelectedConducteurMotos] = useState<Moto[]>([]);
  const [selectedConducteur, setSelectedConducteur] = useState<Conducteur | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    loadConducteurs();
  }, []);

  const loadConducteurs = async () => {
    try {
      setLoading(true);
      const data = await ConducteurService.getAllConducteurs();
      setConducteurs(data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des conducteurs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddConducteur = async (conducteurData: Omit<Conducteur, 'conducteurId'>) => {
    try {
      const newConducteur = await ConducteurService.createConducteur({
        ...conducteurData,
        userId: user?.id || ''
      });
      setConducteurs([...conducteurs, newConducteur]);
      setShowAddForm(false);
      setError(null);
    } catch (err) {
      setError('Erreur lors de l\'ajout du conducteur');
      console.error(err);
    }
  };

  const handleEditConducteur = async (conducteurData: Conducteur) => {
    try {
      const updatedConducteur = await ConducteurService.updateConducteur(conducteurData);
      setConducteurs(conducteurs.map(conducteur => 
        conducteur.conducteurId === updatedConducteur.conducteurId ? updatedConducteur : conducteur
      ));
      setSelectedConducteur(null);
      setError(null);
    } catch (err) {
      setError('Erreur lors de la mise à jour du conducteur');
      console.error(err);
    }
  };

  const handleViewConducteur = async (conducteur: Conducteur) => {
    setSelectedConducteurForView(conducteur);
    try {
      const motos = await ConducteurService.getMotosByUserId(conducteur.userId);
      setSelectedConducteurMotos(motos);
    } catch (error) {
      console.error('Erreur lors du chargement des motos:', error);
      setSelectedConducteurMotos([]);
    }
  };

  const handleDeleteConducteur = async (conducteurId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce conducteur ?')) {
      return;
    }

    try {
      await ConducteurService.deleteConducteur(conducteurId);
      setConducteurs(conducteurs.filter(conducteur => conducteur.conducteurId !== conducteurId));
      setError(null);
    } catch (err) {
      setError('Erreur lors de la suppression du conducteur');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Conducteurs</h1>
        <Button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Ajouter un conducteur
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
        <ConducteurTable
          conducteurs={conducteurs}
          onEditConducteur={(conducteur) => setSelectedConducteur(conducteur)}
          onDeleteConducteur={handleDeleteConducteur}
          onViewConducteur={handleViewConducteur}
        />
      )}
      
      {selectedConducteurForView && (
        <ConducteurDetail
            conducteur={selectedConducteurForView}
            motos={selectedConducteurMotos}
            isOpen={!!selectedConducteurForView}
            onClose={() => setSelectedConducteurForView(null)}
        />
        )}

      {(showAddForm || selectedConducteur) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full">
            <ConducteurForm
              initialData={selectedConducteur || undefined}
              onSubmit={selectedConducteur ? handleEditConducteur : handleAddConducteur}
              onCancel={() => {
                setShowAddForm(false);
                setSelectedConducteur(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}