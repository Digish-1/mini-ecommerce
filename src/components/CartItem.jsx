import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";
import ProductImage from "./ProductImage";
import QuantityControl from "./QuantityControl";

export default function CartItem({ item }) {
  const { increment, decrement, removeFromCart } = useCart();

  return (
    <li className="cart-item">
      <Link to={`/product/${item.id}`} className="cart-item-image">
        <ProductImage src={item.image} alt={item.name} />
      </Link>

      <div className="cart-item-info">
        <Link to={`/product/${item.id}`} className="cart-item-name">{item.name}</Link>
        <span className="muted">{formatPrice(item.price)} each</span>
      </div>

      <QuantityControl
        quantity={item.quantity}
        label={item.name}
        onIncrement={() => increment(item.id)}
        onDecrement={() => decrement(item.id)}
      />

      <strong className="cart-item-total">{formatPrice(item.price * item.quantity)}</strong>

      <button
        type="button"
        className="btn btn-ghost"
        onClick={() => removeFromCart(item.id)}
        aria-label={`Remove ${item.name} from cart`}
      >
        Remove
      </button>
    </li>
  );
}
