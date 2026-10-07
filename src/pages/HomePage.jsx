import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryFilter from "../components/CategoryFilter";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import useDebounce from "../hooks/useDebounce";
import { useProducts } from "../hooks/useProducts";

const ALL = "All";

export default function HomePage() {
  const { data: products, loading, error, retry } = useProducts();

  // Search + category live in the URL so filters survive refresh,
  // back/forward navigation and can be shared as a link.
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") ?? ALL;
  const query = searchParams.get("q") ?? "";

  // The input is local state (instant typing); the URL updates after a pause.
  const [searchText, setSearchText] = useState(query);
  const debouncedSearch = useDebounce(searchText, 300);

  useEffect(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        const trimmed = debouncedSearch.trim();
        if (trimmed) next.set("q", trimmed);
        else next.delete("q");
        return next;
      },
      { replace: true }
    );
  }, [debouncedSearch, setSearchParams]);

  const selectCategory = (value) =>
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value === ALL) next.delete("category");
        else next.set("category", value);
        return next;
      },
      { replace: true }
    );

  const categories = useMemo(
    () => (products ? [ALL, ...new Set(products.map((p) => p.category))] : [ALL]),
    [products]
  );

  const filtered = useMemo(() => {
    if (!products) return [];
    const term = query.toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === ALL || product.category === category;
      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [products, category, query]);

  const clearFilters = () => {
    setSearchText("");
    setSearchParams({}, { replace: true });
  };

  if (loading) return <Loader message="Loading products..." />;
  if (error) return <ErrorMessage message="We couldn't load the products." onRetry={retry} />;

  const hasFilters = category !== ALL || query !== "";

  return (
    <section>
      <h1>Products</h1>

      <div className="toolbar">
        <SearchBar value={searchText} onChange={setSearchText} />
        <CategoryFilter categories={categories} selected={category} onSelect={selectCategory} />
      </div>

      <p className="muted results-count" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "product" : "products"} found
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          title="No products found"
          message="Try a different search term or category."
          action={
            hasFilters && (
              <button type="button" className="btn btn-primary" onClick={clearFilters}>
                Clear filters
              </button>
            )
          }
        />
      ) : (
        <ProductGrid products={filtered} />
      )}
    </section>
  );
}
