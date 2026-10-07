export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="chips" role="group" aria-label="Filter by category">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`chip ${selected === category ? "chip-active" : ""}`}
          aria-pressed={selected === category}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
