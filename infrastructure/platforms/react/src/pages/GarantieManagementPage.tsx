import { useState } from 'react';
import { Garantie } from '../types';
import GarantieForm from '../components/garantieManagement/GarantieForm';
import GarantieTable from '../components/garantieManagement/GarantieTable';
import SearchAndFilters from '../components/shared/SearchAndFilters';

const mockGaranties: Garantie[] = [
  {
    id: '1',
    motoId: 'Tiger 660',
    description: 'Garantie standard de 2 ans',
    dateDebut: '2022-01-01',
    dateFin: '2024-01-01',
    status: 'Actif',
  },
  {
    id: '2',
    motoId: 'Street 900',
    description: 'Garantie prolongée de 3 ans',
    dateDebut: '2021-06-01',
    dateFin: '2024-06-01',
    status: 'Actif',
  },
];

function GarantieManagementPage() {
  const [garanties, setGaranties] = useState<Garantie[]>(mockGaranties);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentGarantie, setCurrentGarantie] = useState<Garantie | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const garantiesPerPage = 5;

  const indexOfLastGarantie = currentPage * garantiesPerPage;
  const indexOfFirstGarantie = indexOfLastGarantie - garantiesPerPage;
  const currentGaranties = garanties.slice(indexOfFirstGarantie, indexOfLastGarantie);

  const totalPages = Math.ceil(garanties.length / garantiesPerPage);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddGarantie = () => {
    setCurrentGarantie(null);
    setIsFormVisible(true);
  };

  const handleEditGarantie = (garantie: Garantie) => {
    setCurrentGarantie(garantie);
    setIsFormVisible(true);
  };

  const handleDeleteGarantie = (id: string) => {
    setGaranties(garanties.filter((garantie) => garantie.id !== id));
    alert('Garantie supprimée avec succès !');
  };

  const handleSubmitGarantie = (garantie: Garantie) => {
    if (garantie.id) {
      // Modification d'une garantie existante
      setGaranties(
        garanties.map((g) => (g.id === garantie.id ? { ...garantie } : g))
      );
      alert('Garantie modifiée avec succès !');
    } else {
      // Ajout d'une nouvelle garantie
      setGaranties([
        ...garanties,
        { ...garantie, id: `${Date.now()}` },
      ]);
      alert('Garantie ajoutée avec succès !');
    }
    setIsFormVisible(false);
  };

  const handleCancelForm = () => {
    setIsFormVisible(false);
  };

  const handleSearch = (query: string) => {
    setGaranties(
      mockGaranties.filter((garantie) =>
        garantie.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleFilter = (filter: string) => {
    if (filter === '') {
      setGaranties(mockGaranties);
    } else {
      setGaranties(
        mockGaranties.filter((garantie) => garantie.status === filter)
      );
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gestion des Garanties</h1>
      <SearchAndFilters
        onSearch={handleSearch}
        onFilter={handleFilter}
        filterOptions={[
          { value: 'Actif', label: 'Actif' },
          { value: 'Expiré', label: 'Expiré' },
        ]}
        placeholder="Rechercher une garantie..."
      />
      <button
        onClick={handleAddGarantie}
        className="bg-blue-500 text-white py-2 px-4 rounded my-4"
      >
        Ajouter une garantie
      </button>
      <GarantieTable
        garanties={currentGaranties}
        onEditGarantie={handleEditGarantie}
        onDeleteGarantie={handleDeleteGarantie}
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
          <GarantieForm
            onSubmit={handleSubmitGarantie}
            onCancel={handleCancelForm}
            initialData={currentGarantie || undefined}
          />
        </div>
      )}
    </div>
  );
}

export default GarantieManagementPage;
