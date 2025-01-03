import { Entretien } from '../../types';

interface EntretienTableProps {
  entretiens: Entretien[];
  onEditEntretien: (entretien: Entretien) => void;
  onDeleteEntretien: (id: string) => void;
}

function EntretienTable({ entretiens, onEditEntretien, onDeleteEntretien }: EntretienTableProps) {
  return (
    <table className="min-w-full border-collapse border border-gray-200 mt-4">
      <thead>
        <tr>
          <th className="border p-2">Modèle de Moto</th>
          <th className="border p-2">Type</th>
          <th className="border p-2">Description</th>
          <th className="border p-2">Date</th>
          <th className="border p-2">Statut</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {entretiens.map((entretien) => (
          <tr key={entretien.id}>
            <td className="border p-2">{entretien.motoId}</td>
            <td className="border p-2">{entretien.type}</td>
            <td className="border p-2">{entretien.description}</td>
            <td className="border p-2">{entretien.date}</td>
            <td className="border p-2">{entretien.status}</td>
            <td className="border p-2">
              <button
                className="bg-green-500 text-white p-1 rounded mr-2"
                onClick={() => onEditEntretien(entretien)}
              >
                Modifier
              </button>
              <button
                className="bg-red-500 text-white p-1 rounded"
                onClick={() => onDeleteEntretien(entretien.id!)}
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

export default EntretienTable;
