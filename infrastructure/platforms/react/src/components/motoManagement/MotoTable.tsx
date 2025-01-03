import { Moto } from '../../types';

interface MotoTableProps {
  motos: Moto[];
  onEditMoto: (moto: Moto) => void;
  onShowMaintenance: (moto: Moto) => void;
  onShowHistory: (moto: Moto) => void;
  onDeleteMoto: (id: string) => void;
}

function MotoTable({ motos, onEditMoto, onShowMaintenance, onShowHistory, onDeleteMoto }: MotoTableProps) {
  return (
    <table className="min-w-full border-collapse border border-gray-200 mt-4">
      <thead>
        <tr>
          <th className="border p-2">Modèle</th>
          <th className="border p-2">N° Série</th>
          <th className="border p-2">Kilométrage</th>
          <th className="border p-2">Statut</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {motos.map((moto) => (
          <tr
            key={moto.id}
            className={moto.kilometrage > 20000 ? 'bg-red-100' : ''}
          >
            <td className="border p-2">{moto.model}</td>
            <td className="border p-2">{moto.serialNumber}</td>
            <td className="border p-2">{moto.kilometrage} km</td>
            <td className="border p-2">{moto.status}</td>
            <td className="border p-2">
              <button
                className="bg-green-500 text-white p-1 rounded mr-2"
                onClick={() => onEditMoto(moto)}
              >
                Modifier
              </button>
              <button
                className="bg-purple-500 text-white p-1 rounded mr-2"
                onClick={() => onShowMaintenance(moto)}
              >
                Entretiens
              </button>
              <button
                className="bg-yellow-500 text-white p-1 rounded mr-2"
                onClick={() => onShowHistory(moto)}
              >
                Historique
              </button>
              <button
                className="bg-red-500 text-white p-1 rounded"
                onClick={() => onDeleteMoto(moto.id!)}
              >
                Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MotoTable;
