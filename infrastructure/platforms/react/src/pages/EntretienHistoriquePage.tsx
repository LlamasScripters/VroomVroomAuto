// infrastructure/platforms/react/src/pages/EntretienHistoriquePage.tsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Entretien } from '../types';
import { EntretienService } from '../services/entretienService';
import EntretienTable from '../components/entretienManagement/EntretienTable';
import SearchAndFilters from '../components/shared/SearchAndFilters';
import { toast } from "react-hot-toast";
import EntretienDetailsView from '../components/entretienManagement/EntretienDetailsView';

function EntretienHistoriquePage() {
  const navigate = useNavigate();
  const [entretiens, setEntretiens] = useState<Entretien[]>([]);
  const [filteredEntretiens, setFilteredEntretiens] = useState<Entretien[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const entretiensPerPage = 5;

  const indexOfLastEntretien = currentPage * entretiensPerPage;
  const indexOfFirstEntretien = indexOfLastEntretien - entretiensPerPage;
  const currentEntretiens = filteredEntretiens.slice(indexOfFirstEntretien, indexOfLastEntretien);
  const totalPages = Math.ceil(filteredEntretiens.length / entretiensPerPage);
  const [selectedEntretien, setSelectedEntretien] = useState<Entretien | null>(null);
  

  useEffect(() => {
    fetchHistoriqueEntretiens();
  }, []);

  const fetchHistoriqueEntretiens = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const allEntretiens = await EntretienService.getAllEntretiens();
      
      // Filtrer les entretiens terminés ou annulés
      const historiqueEntretiens = allEntretiens.filter(entretien => 
        entretien.statut === 'Terminé' || 
        entretien.statut === 'Annulé'
      );
      
      // Trier par date décroissante
      historiqueEntretiens.sort((a, b) => 
        new Date(b.dateRealisee).getTime() - new Date(a.dateRealisee).getTime()
      );

      setEntretiens(historiqueEntretiens);
      setFilteredEntretiens(historiqueEntretiens);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
      setError(errorMessage);
      toast.error('Erreur lors de la récupération de l\'historique des entretiens');
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (query: string) => {
    const filtered = entretiens.filter((entretien) =>
      entretien.recommandationsTechnicien.toLowerCase().includes(query.toLowerCase()) ||
      entretien.recommandationsGestionnaireClient.toLowerCase().includes(query.toLowerCase()) ||
      entretien.typeEntretien.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEntretiens(filtered);
    setCurrentPage(1);
  };

  const handleFilter = (statut: string) => {
    if (statut === '') {
      setFilteredEntretiens(entretiens);
    } else {
      const filtered = entretiens.filter((entretien) => entretien.statut === statut);
      setFilteredEntretiens(filtered);
    }
    setCurrentPage(1);
  };

  return (
    <div className="">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold">Historique des Entretiens</h1>
        <button
          onClick={() => navigate('/entretiens')}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Retour aux entretiens
        </button>
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
          { value: 'Terminé', label: 'Terminé' },
          { value: 'Annulé', label: 'Annulé' },
        ]}
        placeholder="Rechercher dans l'historique..."
      />

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <EntretienTable
          entretiens={currentEntretiens}
          onEditEntretien={() => {}}
          onDeleteEntretien={() => {}}
          onViewEntretien={(entretien) => setSelectedEntretien(entretien)}
          readOnly={true}
        />
      )}

      {selectedEntretien && (
        <EntretienDetailsView
          entretien={selectedEntretien}
          onClose={() => setSelectedEntretien(null)}
        />
      )}

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handleChangePage(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>

  );
}

export default EntretienHistoriquePage;