// Pure reducer: easy to reason about and to unit test.
// A cart item is a snapshot: { id, name, image, price, quantity }.

export const MAX_QUANTITY = 10;

export const ACTIONS = {
  ADD: "cart/add",
  REMOVE: "cart/remove",
  INCREMENT: "cart/increment",
  DECREMENT: "cart/decrement",
  CLEAR: "cart/clear",
};

export function cartReducer(items, action) {
  switch (action.type) {
    case ACTIONS.ADD: {
      const { product, quantity = 1 } = action.payload;
      const existing = items.find((item) => item.id === product.id);

      if (existing) {
        return items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, MAX_QUANTITY) }
            : item
        );
      }

      const { id, name, image, price } = product;
      return [...items, { id, name, image, price, quantity: Math.min(quantity, MAX_QUANTITY) }];
    }

    case ACTIONS.REMOVE:
      return items.filter((item) => item.id !== action.payload.id);

    case ACTIONS.INCREMENT:
      return items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY) }
          : item
      );

    case ACTIONS.DECREMENT:
      // Never goes below 1 - removing is an explicit action.
      return items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      );

    case ACTIONS.CLEAR:
      return [];

    default:
      return items;
  }
}
