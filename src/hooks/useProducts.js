import { fetchProductById, fetchProducts } from "../services/productService";
import useAsync from "./useAsync";

export const useProducts = () => useAsync(fetchProducts, []);

export const useProduct = (id) => useAsync(() => fetchProductById(id), [id]);
