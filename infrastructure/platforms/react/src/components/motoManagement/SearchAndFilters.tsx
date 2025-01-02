function SearchAndFilters({ onSearch, onFilter }: { onSearch: (query: string) => void; onFilter: (filter: string) => void }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
      <input
        type="text"
        placeholder="Rechercher une moto..."
        onChange={(e) => onSearch(e.target.value)}
        className="border p-2 rounded w-1/3"
      />
      <select onChange={(e) => onFilter(e.target.value)} className="border p-2 rounded">
        <option value="">Tous les modèles</option>
        <option value="Tiger">Tiger</option>
        <option value="Street">Street</option>
      </select>
      <button className="bg-blue-500 text-white p-2 rounded">Ajouter une moto</button>
    </div>
  );
}

export default SearchAndFilters;
