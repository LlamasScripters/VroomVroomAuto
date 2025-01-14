import { useState } from 'react';
import { Panne } from '../types';
import PanneTable from '../components/panneManagement/PanneTable';
import PanneForm from '../components/panneManagement/PanneForm';
import SearchAndFilters from '../components/shared/SearchAndFilters';

const mockPannes: Panne[] = [
  {
    id: '1',
    motoId: 'Tiger 660',
    description: 'Problème moteur',
    date: '2023-10-10',
    actionCorrective: 'Réparation du moteur',
    status: 'En cours',
  },
  {
    id: '2',
    motoId: 'Street 900',
    description: 'Freins défectueux',
    date: '2023-11-01',
    actionCorrective: 'Remplacement des freins',
    status: 'Résolue',
  },
];

function PanneManagementPage() {
  const [pannes, setPannes] = useState<Panne[]>(mockPannes);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentPanne, setCurrentPanne] = useState<Panne | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pannesPerPage = 5;

  const indexOfLastPanne = currentPage * pannesPerPage;
  const indexOfFirstPanne = indexOfLastPanne - pannesPerPage;
  const currentPannes = pannes.slice(indexOfFirstPanne, indexOfLastPanne);

  const totalPages = Math.ceil(pannes.length / pannesPerPage);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddPanne = () => {
    setCurrentPanne(null);
    setIsFormVisible(true);
  };

  const handleEditPanne = (panne: Panne) => {
    setCurrentPanne(panne);
    setIsFormVisible(true);
  };

  const handleDeletePanne = (id: string) => {
    setPannes(pannes.filter((panne) => panne.id !== id));
    alert("Panne supprimée avec succès !");
  };

  const handleSubmitPanne = (panne: Panne) => {
    if (panne.id) {
      // Modification d'une panne existante
      setPannes(
        pannes.map((p) => (p.id === panne.id ? { ...panne } : p))
      );
      alert("Panne modifiée avec succès !");
    } else {
      // Ajout d'une nouvelle panne
      setPannes([
        ...pannes,
        { ...panne, id: `${Date.now()}` },
      ]);
      alert("Panne ajoutée avec succès !");
    }
    setIsFormVisible(false);
  };

  const handleCancelForm = () => {
    setIsFormVisible(false);
  };

  const handleSearch = (query: string) => {
    setPannes(
      mockPannes.filter((panne) =>
        panne.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleFilter = (filter: string) => {
    if (filter === '') {
      setPannes(mockPannes);
    } else {
      setPannes(
        mockPannes.filter((panne) => panne.status === filter)
      );
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Gestion des Pannes</h1>
      <SearchAndFilters
        onSearch={handleSearch}
        onFilter={handleFilter}
        filterOptions={[
          { value: 'En cours', label: 'En cours' },
          { value: 'Résolue', label: 'Résolue' },
        ]}
        placeholder="Rechercher une panne..."
      />
      <button
        onClick={handleAddPanne}
        className="bg-blue-500 text-white py-2 px-4 rounded my-4"
      >
        Ajouter une panne
      </button>
      <PanneTable
        pannes={currentPannes}
        onEditPanne={handleEditPanne}
        onDeletePanne={handleDeletePanne}
      />

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handleChangePage(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <PanneForm
            onSubmit={handleSubmitPanne}
            onCancel={handleCancelForm}
            initialData={currentPanne || undefined}
          />
        </div>
      )}
    </div>
  );
}

export default PanneManagementPage;
