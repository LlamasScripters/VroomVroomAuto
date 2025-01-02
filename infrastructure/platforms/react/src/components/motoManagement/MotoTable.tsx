interface Moto {
  id: string;
  model: string;
  serialNumber: string;
  kilometrage: number;
  status: string;
}

function MotoTable({ motos }: { motos: Moto[] }) {
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
          <tr key={moto.id}>
            <td className="border p-2">{moto.model}</td>
            <td className="border p-2">{moto.serialNumber}</td>
            <td className="border p-2">{moto.kilometrage} km</td>
            <td className="border p-2">{moto.status}</td>
            <td className="border p-2">
              <button className="bg-green-500 text-white p-1 rounded mr-2">Modifier</button>
              <button className="bg-yellow-500 text-white p-1 rounded">Historique</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MotoTable;
