import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">🛍️ Mini Shop</Link>
        <nav>
          <NavLink to="/" end>Products</NavLink>
          <NavLink to="/cart" className="cart-link">
            Cart
            <span className="cart-badge" aria-label={`${totalItems} items in cart`}>
              {totalItems}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
