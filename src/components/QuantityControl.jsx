import { MAX_QUANTITY } from "../context/cartReducer";

export default function QuantityControl({ quantity, onIncrement, onDecrement, label }) {
  return (
    <div className="quantity" role="group" aria-label={`Quantity for ${label}`}>
      <button
        type="button"
        onClick={onDecrement}
        disabled={quantity <= 1}
        aria-label={`Decrease quantity of ${label}`}
      >
        −
      </button>
      <span aria-live="polite">{quantity}</span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={quantity >= MAX_QUANTITY}
        aria-label={`Increase quantity of ${label}`}
      >
        +
      </button>
    </div>
  );
}
