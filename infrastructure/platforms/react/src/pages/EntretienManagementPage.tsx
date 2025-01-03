import { useState } from 'react';
import { Entretien } from '../types'; 
import EntretienTable from '../components/entretienManagement/EntretienTable';
import EntretienForm from '../components/entretienManagement/EntretienForm';
import SearchAndFilters from '../components/shared/SearchAndFilters';

const mockEntretiens: Entretien[] = [
  {
    id: '1',
    motoId: 'Tiger 660',
    type: 'Préventif',
    description: 'Changement d’huile',
    date: '2023-10-15',
    status: 'Terminé',
  },
  {
    id: '2',
    motoId: 'Street 900',
    type: 'Curatif',
    description: 'Réparation des freins',
    date: '2023-11-20',
    status: 'En cours',
  },
];

function EntretienManagementPage() {
  const [entretiens, setEntretiens] = useState<Entretien[]>(mockEntretiens);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentEntretien, setCurrentEntretien] = useState<Entretien | null>(null);

  const handleAddEntretien = () => {
    setCurrentEntretien(null);
    setIsFormVisible(true);
  };

  const handleEditEntretien = (entretien: Entretien) => {
    setCurrentEntretien(entretien);
    setIsFormVisible(true);
  };

  const handleDeleteEntretien = (id: string) => {
    setEntretiens(entretiens.filter((entretien) => entretien.id !== id));
  };

  const handleSubmitEntretien = (entretien: Entretien) => {
    if (entretien.id) {
      // Modification d'un entretien existant
      setEntretiens(
        entretiens.map((e) => (e.id === entretien.id ? { ...entretien } : e))
      );
    } else {
      // Ajout d'un nouvel entretien
      setEntretiens([
        ...entretiens,
        { ...entretien, id: `${Date.now()}` },
      ]);
    }
    setIsFormVisible(false);
  };

  const handleCancelForm = () => {
    setIsFormVisible(false);
  };

  const handleSearch = (query: string) => {
    setEntretiens(
      mockEntretiens.filter((entretien) =>
        entretien.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleFilter = (filter: string) => {
    if (filter === '') {
      setEntretiens(mockEntretiens);
    } else {
      setEntretiens(
        mockEntretiens.filter((entretien) => entretien.type === filter)
      );
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gestion des Entretiens</h1>
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
      <EntretienTable
        entretiens={entretiens}
        onEditEntretien={handleEditEntretien}
        onDeleteEntretien={handleDeleteEntretien}
      />

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
