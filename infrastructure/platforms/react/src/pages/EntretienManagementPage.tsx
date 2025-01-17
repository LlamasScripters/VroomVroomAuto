import { useEffect, useState } from 'react';
import { Entretien } from '../types';
import { EntretienService } from '../services/entretienService';
import EntretienTable from '../components/entretienManagement/EntretienTable';
import EntretienForm from '../components/entretienManagement/EntretienForm';
import SearchAndFilters from '../components/shared/SearchAndFilters';
import { toast } from "react-hot-toast";

function EntretienManagementPage() {
  const [entretiens, setEntretiens] = useState<Entretien[]>([]);
  const [filteredEntretiens, setFilteredEntretiens] = useState<Entretien[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentEntretien, setCurrentEntretien] = useState<Entretien | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const entretiensPerPage = 5;

  useEffect(() => {
    fetchEntretiens();
  }, []);

  const indexOfLastEntretien = currentPage * entretiensPerPage;
  const indexOfFirstEntretien = indexOfLastEntretien - entretiensPerPage;
  const currentEntretiens = filteredEntretiens.slice(indexOfFirstEntretien, indexOfLastEntretien);
  const totalPages = Math.ceil(filteredEntretiens.length / entretiensPerPage);

  const fetchEntretiens = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await EntretienService.getAllEntretiens();
      setEntretiens(data);
      setFilteredEntretiens(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
      setError(errorMessage);
      toast.error('Erreur lors de la récupération des entretiens');
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddEntretien = () => {
    setCurrentEntretien(null);
    setIsFormVisible(true);
  };

  const handleEditEntretien = (entretien: Entretien) => {
    setCurrentEntretien(entretien);
    setIsFormVisible(true);
  };

  const handleDeleteEntretien = async (id: string) => {
    try {
      setError(null);
      await EntretienService.deleteEntretien(id);
      setEntretiens(entretiens.filter((entretien) => entretien.entretienId !== id));
      setFilteredEntretiens(filteredEntretiens.filter((entretien) => entretien.entretienId !== id));
      toast.success("Entretien supprimé avec succès");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
      setError(errorMessage);
      toast.error("Erreur lors de la suppression de l'entretien");
      console.error('Erreur:', error);
    }
  };

  const handleSubmitEntretien = async (entretien: Entretien) => {
    try {
      setError(null);
      
      if (currentEntretien?.entretienId) {
        // Mise à jour d'un entretien existant
        await EntretienService.updateEntretien({
          ...entretien,
          entretienId: currentEntretien.entretienId
        });
        
        await fetchEntretiens(); // Recharger tous les entretiens pour avoir les données à jour
        toast.success("Entretien modifié avec succès");
      } else {
        // Création d'un nouvel entretien
        await EntretienService.createEntretien(entretien);
        await fetchEntretiens(); // Recharger tous les entretiens
        toast.success("Entretien ajouté avec succès");
      }
  
      setIsFormVisible(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
      setError(errorMessage);
      toast.error("Erreur lors de la sauvegarde de l'entretien");
      console.error('Erreur:', error);
    }
  };

  const handleCancelForm = () => {
    setIsFormVisible(false);
  };

  const handleSearch = (query: string) => {
    const filtered = entretiens.filter((entretien) =>
      entretien.recommandationsTechnicien.toLowerCase().includes(query.toLowerCase()) ||
      entretien.recommandationsGestionnaireClient.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEntretiens(filtered);
    setCurrentPage(1);
  };

  const handleFilter = (filter: string) => {
    if (filter === '') {
      setFilteredEntretiens(entretiens);
    } else {
      const filtered = entretiens.filter((entretien) => entretien.typeEntretien === filter);
      setFilteredEntretiens(filtered);
    }
    setCurrentPage(1);
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Gestion des Entretiens</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <SearchAndFilters
        onSearch={handleSearch}
        onFilter={handleFilter}
        filterOptions={[
          { value: 'Préventif', label: 'Préventif' },
          { value: 'Curatif', label: 'Curatif' },
        ]}
        placeholder="Rechercher un entretien..."
      />

      <button
        onClick={handleAddEntretien}
        className="bg-blue-500 text-white py-2 px-4 rounded my-4"
      >
        Ajouter un entretien
      </button>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <EntretienTable
          entretiens={currentEntretiens}
          onEditEntretien={handleEditEntretien}
          onDeleteEntretien={handleDeleteEntretien}
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

      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <EntretienForm
            onSubmit={handleSubmitEntretien}
            onCancel={handleCancelForm}
            initialData={currentEntretien || undefined}
          />
        </div>
      )}
    </div>
  );
}

export default EntretienManagementPage;