import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { ACTIONS, cartReducer } from "./cartReducer";

const STORAGE_KEY = "mini-shop:cart";

// Read the saved cart once, defensively: localStorage may be unavailable,
// hold corrupted JSON, or contain data from an older shape.
function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item) =>
        item &&
        typeof item.id === "number" &&
        typeof item.name === "string" &&
        typeof item.price === "number" &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
    );
  } catch {
    return [];
  }
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Lazy initialiser: loadCart runs only on the first render.
  const [items, dispatch] = useReducer(cartReducer, undefined, loadCart);

  // Persist on every change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage full / blocked - the cart still works for this session.
    }
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      getQuantity: (id) => items.find((item) => item.id === id)?.quantity ?? 0,
      addToCart: (product, quantity = 1) =>
        dispatch({ type: ACTIONS.ADD, payload: { product, quantity } }),
      removeFromCart: (id) => dispatch({ type: ACTIONS.REMOVE, payload: { id } }),
      increment: (id) => dispatch({ type: ACTIONS.INCREMENT, payload: { id } }),
      decrement: (id) => dispatch({ type: ACTIONS.DECREMENT, payload: { id } }),
      clearCart: () => dispatch({ type: ACTIONS.CLEAR }),
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}
