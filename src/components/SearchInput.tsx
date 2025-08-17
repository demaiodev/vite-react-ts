type SearchInputProps = {
  searchTerm: string;
  loading: boolean;
  setSearchTerm: (value: string) => void;
  fetchMovies: () => void;
};

export default function SearchInput({
  searchTerm,
  loading,
  setSearchTerm,
  fetchMovies,
}: SearchInputProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        fetchMovies();
      }}
    >
      <label htmlFor="search-input" className="sr-only">
        Search
      </label>
      <input
        type="text"
        id="search-input"
        name="search-input"
        className="search-input mx-auto p-4 mr-1 rounded-lg shadow-lg focus:outline-none"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="search-button p-4 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 focus:outline-none"
        disabled={loading}
      >
        Search
      </button>
    </form>
  );
}
