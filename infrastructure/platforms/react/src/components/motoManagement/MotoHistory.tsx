interface HistoryItem {
  date: string;
  description: string;
  cost: number;
}

function MotoHistory({ history }: { history: HistoryItem[] }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Historique des entretiens</h2>
      <ul className="space-y-2">
        {history.map((item, index) => (
          <li key={index} className="border-b py-2">
            <p>Date : {item.date}</p>
            <p>Description : {item.description}</p>
            <p>Coût : {item.cost}€</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MotoHistory;
