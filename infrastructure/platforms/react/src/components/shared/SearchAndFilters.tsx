interface SearchAndFiltersProps {
    onSearch: (query: string) => void;
    onFilter: (filter: string) => void;
    filterOptions: { value: string; label: string }[];
    placeholder?: string;
  }
  
  function SearchAndFilters({ onSearch, onFilter, filterOptions, placeholder = "Rechercher..." }: SearchAndFiltersProps) {
    return (
      <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => onSearch(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <select onChange={(e) => onFilter(e.target.value)} className="border p-2 rounded">
          <option value="">Tous</option>
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  
  export default SearchAndFilters;
  