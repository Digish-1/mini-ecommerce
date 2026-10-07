# Mini Shop - React E-Commerce App

A small, responsive e-commerce front end built with **React 18**, **Vite** and **React Router**.
Users can browse products, search and filter them, open a product detail page and manage a
shopping cart that persists across page reloads.

## Features

- **Product listing** - responsive grid (1 column on mobile up to 4+ on desktop)
- **Search** - debounced, case-insensitive, matches product name and category
- **Category filter** - chips generated from the data; search + category combine
- **Shareable filters** - search and category are stored in the URL (`/?q=shirt&category=Clothing`)
- **Product details** - `/product/:id` route with image, rating, price and description
- **Shopping cart** - add, remove, increase/decrease quantity (1-10), total items and total price
- **Persistent cart** - saved to `localStorage`, safely restored on reload
- **Loading, error and empty states** - spinner, retry button, "no results", empty cart, 404 and
  "product not found"
- **Accessible** - semantic HTML, labels, `aria-live` regions, keyboard focus styles

## Tech stack

React 18 (hooks, context, `useReducer`), React Router v6, Vite, plain CSS (no UI library).

## Getting started

Requires **Node.js 18+**.

```bash
# 1. install dependencies
npm install

# 2. start the dev server
npm run dev
# -> open the URL printed in the terminal (usually http://localhost:5173)

# 3. (optional) production build / preview
npm run build
npm run preview
```

## Project structure

```
src/
├── components/        # Reusable UI pieces (ProductCard, QuantityControl, Loader, ...)
├── pages/             # Route-level screens (Home, ProductDetail, Cart, NotFound)
├── context/           # CartContext (provider + hook) and the pure cartReducer
├── hooks/             # useAsync, useProducts, useDebounce
├── services/          # productService - async access to the local JSON data
├── data/products.json # Local dummy product data
├── utils/             # formatPrice helper
├── App.jsx            # Routes
└── main.jsx           # Entry point (Router + CartProvider)
```

## Design decisions

- **Cart state with `useReducer` + Context.** Cart logic lives in a pure reducer
  (`cartReducer.js`) so every state transition is in one place and easy to test. Context exposes
  derived values (`totalItems`, `totalPrice`) and action helpers, so no prop drilling is needed.
- **Persistence.** A `useEffect` writes the cart to `localStorage` whenever it changes. The initial
  state is read lazily and validated, so corrupted or blocked storage falls back to an empty cart
  instead of crashing.
- **Simulated async data layer.** `productService` loads the local JSON with a short artificial delay,
  so the UI handles real loading and error states exactly as it would with an API. `useAsync`
  ignores stale responses and exposes `retry`.
- **Cart items are snapshots** (`id, name, image, price, quantity`), so the cart renders without
  needing the product list to be loaded.
- **Quantity rules.** Minimum 1 (use "Remove" to delete), maximum 10 per product.

## Notes

- Product images come from [picsum.photos](https://picsum.photos) (placeholder photos, internet
  required). If an image fails to load, a fallback is shown. Swap URLs in `src/data/products.json`
  to use your own images.
- To preview the error state, make `loadProducts` in `src/services/productService.js` throw.
- No backend or external API is used; there is no checkout flow (out of scope).

