import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import EmptyState from "../components/EmptyState";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";

export default function CartPage() {
  const { items, totalItems, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <EmptyState
        icon="🛒"
        title="Your cart is empty"
        message="Looks like you haven't added anything yet."
        action={<Link to="/" className="btn btn-primary">Start shopping</Link>}
      />
    );
  }

  return (
    <section>
      <h1>Your Cart</h1>

      <div className="cart-layout">
        <ul className="cart-list">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </ul>

        <aside className="summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Total items</span>
            <strong>{totalItems}</strong>
          </div>
          <div className="summary-row summary-total">
            <span>Total price</span>
            <strong>{formatPrice(totalPrice)}</strong>
          </div>
          <button type="button" className="btn btn-ghost btn-block" onClick={clearCart}>
            Clear cart
          </button>
        </aside>
      </div>
    </section>
  );
}
