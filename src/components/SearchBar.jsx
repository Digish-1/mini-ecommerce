export default function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <label htmlFor="search" className="sr-only">Search products</label>
      <input
        id="search"
        type="search"
        placeholder="Search products..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete="off"
      />
    </div>
  );
}
