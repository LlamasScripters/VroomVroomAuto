import { useState } from 'react';
import { Moto } from '../types';
import MotoTable from '../components/motoManagement/MotoTable';
import SearchAndFilters from '../components/shared/SearchAndFilters';
import MotoForm from '../components/motoManagement/MotoForm';
import MotoHistory from '../components/motoManagement/MotoHistory';
import MotoMaintenance from '../components/motoManagement/MotoMaintenance';

const mockMotos: Moto[] = [
  { id: '1', marque: 'Triumph', model: 'Tiger 660', serialNumber: '123456', kilometrage: 15000, dateMiseEnService: '2022-01-01', status: 'En service' },
  { id: '2', marque: 'Triumph', model: 'Street 900', serialNumber: '654321', kilometrage: 20000, dateMiseEnService: '2021-06-15', status: 'Hors service' },
];

function MotoManagementPage() {
  const [motos, setMotos] = useState<Moto[]>(mockMotos);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentMoto, setCurrentMoto] = useState<Moto | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const motosPerPage = 5;

  interface MaintenanceEntry {
    date: string;
    description: string;
    kilometrage: number;
  }

  const [maintenanceMoto, setMaintenanceMoto] = useState<{ moto: Moto; maintenance: MaintenanceEntry[] } | null>(null);

  interface HistoryItem {
    date: string;
    description: string;
    cost: number;
  }

  const [historyMoto, setHistoryMoto] = useState<{ moto: Moto; history: HistoryItem[] } | null>(null);

  const handleSearch = (query: string) => {
    setMotos(
      mockMotos.filter((moto) =>
        moto.model.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleFilter = (filter: string) => {
    if (filter === '') {
      setMotos(mockMotos);
    } else {
      setMotos(mockMotos.filter((moto) => moto.model === filter));
    }
  };

  const handleEditMoto = (moto: Moto) => {
    setCurrentMoto(moto);
    setIsFormVisible(true);
  };

  const handleAddMoto = () => {
    setCurrentMoto(null);
    setIsFormVisible(true);
  };

  const handleSubmitMoto = (moto: Moto) => {
    if (moto.id) {
      // Modification : remplacer la moto existante
      setMotos(
        motos.map((m) => (m.id === moto.id ? { ...m, ...moto } : m))
      );
    } else {
      // Ajout d'une nouvelle moto
      setMotos([...motos, { ...moto, id: `${Date.now()}` }]);
    }
    setIsFormVisible(false);
  };  

  const handleCancelForm = () => {
    setIsFormVisible(false);
  };

  const handleShowMaintenance = (moto: Moto) => {
    const maintenance = [
      { date: '2023-11-01', description: 'Changement d\'huile', kilometrage: 12000 },
      { date: '2023-09-15', description: 'Révision complète', kilometrage: 10000 },
    ];
    setMaintenanceMoto({ moto, maintenance });
  };

  const handleAddMaintenance = (entry: MaintenanceEntry) => {
    if (maintenanceMoto) {
      setMaintenanceMoto({
        ...maintenanceMoto,
        maintenance: [...maintenanceMoto.maintenance, entry],
      });
    }
  };

  const handleShowHistory = (moto: Moto) => {
    const history = [
      { date: '2023-12-01', description: 'Changement de pneus', cost: 200 },
      { date: '2023-10-15', description: 'Révision générale', cost: 150 },
    ];
    setHistoryMoto({ moto, history });
  };

  const handleDeleteMoto = (id: string) => {
    setMotos(motos.filter((moto) => moto.id !== id));
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastMoto = currentPage * motosPerPage;
  const indexOfFirstMoto = indexOfLastMoto - motosPerPage;
  const currentMotos = motos.slice(indexOfFirstMoto, indexOfLastMoto);

  const totalPages = Math.ceil(motos.length / motosPerPage);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gestion des Motos</h1>
      <SearchAndFilters
        onSearch={handleSearch}
        onFilter={handleFilter}
        filterOptions={[
          { value: 'Tiger', label: 'Tiger' },
          { value: 'Street', label: 'Street' },
        ]}
        placeholder="Rechercher une moto..."
      />
      <button
        onClick={handleAddMoto}
        className="bg-blue-500 text-white py-2 px-4 rounded my-4"
      >
        Ajouter une moto
      </button>
      <MotoTable
        motos={currentMotos}
        onEditMoto={handleEditMoto}
        onShowMaintenance={handleShowMaintenance}
        onShowHistory={handleShowHistory}
        onDeleteMoto={handleDeleteMoto}
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
          <MotoForm
            onSubmit={handleSubmitMoto}
            onCancel={handleCancelForm}
            initialData={currentMoto || undefined}
          />
        </div>
      )}

      {maintenanceMoto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <MotoMaintenance
            maintenance={maintenanceMoto.maintenance}
            onAdd={handleAddMaintenance}
            onClose={() => setMaintenanceMoto(null)}
          />
        </div>
      )}

      {historyMoto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <MotoHistory history={historyMoto.history} />
          <button
            onClick={() => setHistoryMoto(null)}
            className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded"
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
}

export default MotoManagementPage;
