import { useState } from 'react';
import { Reparation } from '../types';
import ReparationForm from '../components/reparationManagement/ReparationForm';
import ReparationTable from '../components/reparationManagement/ReparationTable';
import SearchAndFilters from '../components/shared/SearchAndFilters';

const mockReparations: Reparation[] = [
  {
    id: '1',
    panneId: '123',
    description: 'Réparation moteur',
    date: '2023-10-15',
    actionsCorrectives: ['Remplacement des pièces défectueuses', 'Test moteur'],
  },
  {
    id: '2',
    panneId: '124',
    description: 'Freins défectueux',
    date: '2023-11-01',
    actionsCorrectives: ['Changement des disques', 'Test de freinage'],
  },
];

function ReparationManagementPage() {
    const [reparations, setReparations] = useState<Reparation[]>(mockReparations);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [currentReparation, setCurrentReparation] = useState<Reparation | null>(null);
  
    const handleAddReparation = () => {
      setCurrentReparation(null);
      setIsFormVisible(true);
    };
  
    const handleEditReparation = (reparation: Reparation) => {
      setCurrentReparation(reparation);
      setIsFormVisible(true);
    };
  
    const handleDeleteReparation = (id: string) => {
      setReparations(reparations.filter((reparation) => reparation.id !== id));
      alert("Réparation supprimée avec succès !");
    };
  
    const handleSubmitReparation = (reparation: Reparation) => {
      if (reparation.id) {
        setReparations(
          reparations.map((r) => (r.id === reparation.id ? { ...reparation } : r))
        );
        alert("Réparation modifiée avec succès !");
      } else {
        setReparations([
          ...reparations,
          { ...reparation, id: `${Date.now()}` },
        ]);
        alert("Réparation ajoutée avec succès !");
      }
      setIsFormVisible(false);
    };
  
    const handleCancelForm = () => {
      setIsFormVisible(false);
    };
  
    const handleSearch = (query: string) => {
      setReparations(
        mockReparations.filter((reparation) =>
          reparation.description.toLowerCase().includes(query.toLowerCase())
        )
      );
    };
  
    const handleFilter = (filter: string) => {
      if (filter === '') {
        setReparations(mockReparations);
      } else {
        setReparations(
          mockReparations.filter((reparation) =>
            reparation.actionsCorrectives.includes(filter)
          )
        );
      }
    };
  
    return (
      <div className="">
        <h1 className="text-2xl font-bold mb-4">Gestion des Réparations</h1>
        <SearchAndFilters
          onSearch={handleSearch}
          onFilter={handleFilter}
          filterOptions={[
            { value: 'Remplacement des pièces défectueuses', label: 'Remplacement des pièces' },
            { value: 'Test moteur', label: 'Test moteur' },
            { value: 'Changement des disques', label: 'Changement des disques' },
            { value: 'Test de freinage', label: 'Test de freinage' },
          ]}
          placeholder="Rechercher une réparation..."
        />
        <button
          onClick={handleAddReparation}
          className="bg-blue-500 text-white py-2 px-4 rounded my-4"
        >
          Ajouter une réparation
        </button>
        <ReparationTable
          reparations={reparations}
          onEditReparation={handleEditReparation}
          onDeleteReparation={handleDeleteReparation}
        />
  
        {isFormVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <ReparationForm
              onSubmit={handleSubmitReparation}
              onCancel={handleCancelForm}
              initialData={currentReparation || undefined}
            />
          </div>
        )}
      </div>
    );
  }
  

export default ReparationManagementPage;
