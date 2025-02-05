// infrastructure/platforms/react/src/pages/CommandeManagementPage.tsx

import { useEffect, useState } from 'react';
import { Commande } from '../types';
import { CommandeService } from '../services/commandeService';
import { CommandeTable } from '../components/commandeManagement/CommandeTable';
import { CommandeForm } from '../components/commandeManagement/CommandeForm';
import { CommandeDetailsView } from '../components/commandeManagement/CommandeDetailsView';
import SearchAndFilters from '../components/shared/SearchAndFilters';
import { toast } from "react-hot-toast";
import { useAuthStore } from '@/stores/authStore';

export default function CommandeManagementPage() {
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [filteredCommandes, setFilteredCommandes] = useState<Commande[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentCommande, setCurrentCommande] = useState<Commande | null>(null);
  const [selectedCommande, setSelectedCommande] = useState<Commande | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuthStore();
  const commandesPerPage = 10;

  useEffect(() => {
    fetchCommandes();
  }, []);

  const fetchCommandes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await CommandeService.getAllCommandes();
      setCommandes(data);
      setFilteredCommandes(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
      setError(errorMessage);
      toast.error('Erreur lors de la récupération des commandes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCommande = () => {
    setCurrentCommande(null);
    setIsFormVisible(true);
  };

  const handleEditCommande = (commande: Commande) => {
    setCurrentCommande(commande);
    setIsFormVisible(true);
  };

  const handleViewCommande = (commande: Commande) => {
    setSelectedCommande(commande);
  };

  const handleDeleteCommande = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      return;
    }

    try {
      await CommandeService.deleteCommande(id);
      setCommandes(commandes.filter(commande => commande.commandeId !== id));
      setFilteredCommandes(filteredCommandes.filter(commande => commande.commandeId !== id));
      toast.success('Commande supprimée avec succès');
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la suppression de la commande");
    }
  };

  const handleSubmitCommande = async (commandeData: {
    pieceId: string;
    quantiteCommandee: number;
    dateLivraisonPrevue: string;
  }) => {
    try {
      if (currentCommande?.commandeId) {
        await CommandeService.updateCommande({
          ...currentCommande,
          ...commandeData,
          userId: user?.id || '',
        });
        toast.success('Commande modifiée avec succès');
      } else {
        await CommandeService.createCommande({
          ...commandeData,
          userId: user?.id || '',
          dateCommande: new Date().toISOString(),
          coutTotal: 0,
          statut: 'EN_ATTENTE'
        });
        toast.success('Commande créée avec succès');
      }
      setIsFormVisible(false);
      fetchCommandes();
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'enregistrement de la commande");
    }
  };

  const handleSearch = (query: string) => {
    const filtered = commandes.filter((commande) =>
      commande.pieceDetails?.reference.toLowerCase().includes(query.toLowerCase()) ||
      commande.pieceDetails?.nom.toLowerCase().includes(query.toLowerCase()) ||
      commande.statut.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCommandes(filtered);
    setCurrentPage(1);
  };

  const handleFilter = (statut: string) => {
    if (statut === '') {
      setFilteredCommandes(commandes);
    } else {
      const filtered = commandes.filter((commande) => commande.statut === statut);
      setFilteredCommandes(filtered);
    }
    setCurrentPage(1);
  };

  // Pagination
  const indexOfLastCommande = currentPage * commandesPerPage;
  const indexOfFirstCommande = indexOfLastCommande - commandesPerPage;
  const currentCommandes = filteredCommandes.slice(indexOfFirstCommande, indexOfLastCommande);
  const totalPages = Math.ceil(filteredCommandes.length / commandesPerPage);

  return (
    <div className="container mx-auto p-4">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold">Gestion des Commandes</h1>
        <div className="space-x-4">
          <button
            onClick={handleAddCommande}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Nouvelle commande
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <SearchAndFilters
        onSearch={handleSearch}
        onFilter={handleFilter}
        filterOptions={[
          { value: 'EN_ATTENTE', label: 'En attente' },
          { value: 'EN_COURS', label: 'En cours' },
          { value: 'LIVREE', label: 'Livrée' },
          { value: 'ANNULEE', label: 'Annulée' },
        ]}
        placeholder="Rechercher une commande..."
      />

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      ) : (
    <CommandeTable
      commandes={currentCommandes}
      onEditCommande={handleEditCommande}
      onDeleteCommande={handleDeleteCommande}
      onViewCommande={handleViewCommande}
      onRefresh={fetchCommandes}
    />
      )}

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <CommandeForm
            onSubmit={handleSubmitCommande}
            onCancel={() => setIsFormVisible(false)}
            initialData={currentCommande ? {
              pieceId: currentCommande.pieceId,
              quantiteCommandee: currentCommande.quantiteCommandee,
              dateLivraisonPrevue: currentCommande.dateLivraisonPrevue
            } : undefined}
          />
        </div>
      )}

      {selectedCommande && (
        <CommandeDetailsView
          commande={selectedCommande}
          onClose={() => setSelectedCommande(null)}
        />
      )}
    </div>
  );
}