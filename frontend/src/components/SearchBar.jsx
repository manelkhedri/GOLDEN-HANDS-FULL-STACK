import './SearchBar.css';
function SearchBar({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search crochet products..."
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        aria-label="Search products"
      />

      <select
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
        aria-label="Filter by category"
      >
        <option value="All">All Categories</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SearchBar;