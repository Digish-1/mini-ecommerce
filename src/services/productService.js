// Simulates an async API on top of the local JSON file.
// Dynamic import keeps the data out of the main bundle and lets us
// exercise real loading / error states in the UI.

const SIMULATED_LATENCY_MS = 600;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function loadProducts() {
  await wait(SIMULATED_LATENCY_MS);
  const module = await import("../data/products.json");
  return module.default;
}

export async function fetchProducts() {
  return loadProducts();
}

export async function fetchProductById(id) {
  const products = await loadProducts();
  // Returns undefined when not found - callers decide how to show that.
  return products.find((product) => String(product.id) === String(id));
}
