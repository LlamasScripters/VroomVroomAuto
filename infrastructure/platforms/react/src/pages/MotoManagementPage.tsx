import { useState } from 'react';
import MotoTable from '../components/motoManagement/MotoTable';
import SearchAndFilters from '../components/motoManagement/SearchAndFilters';

const mockMotos = [
  { id: '1', model: 'Tiger 660', serialNumber: '123456', kilometrage: 15000, status: 'OK' },
  { id: '2', model: 'Street 900', serialNumber: '654321', kilometrage: 20000, status: 'Entretien dû' },
];

function MotoManagementPage() {
  const [motos, setMotos] = useState(mockMotos);

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

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gestion des Motos</h1>
      <SearchAndFilters onSearch={handleSearch} onFilter={handleFilter} />
      <MotoTable motos={motos} />
    </div>
  );
}

export default MotoManagementPage;

