import { Link, useNavigate, useParams } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import ProductImage from "../components/ProductImage";
import QuantityControl from "../components/QuantityControl";
import Rating from "../components/Rating";
import { useCart } from "../context/CartContext";
import { useProduct } from "../hooks/useProducts";
import { formatPrice } from "../utils/format";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, loading, error, retry } = useProduct(id);
  const { addToCart, getQuantity, increment, decrement, removeFromCart } = useCart();

  if (loading) return <Loader message="Loading product..." />;
  if (error) return <ErrorMessage message="We couldn't load this product." onRetry={retry} />;

  if (!product) {
    return (
      <EmptyState
        icon="😕"
        title="Product not found"
        message="This product doesn't exist or is no longer available."
        action={<Link to="/" className="btn btn-primary">Back to products</Link>}
      />
    );
  }

  const quantity = getQuantity(product.id);

  return (
    <section>
      <button type="button" className="btn btn-ghost back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="detail">
        <div className="detail-image">
          <ProductImage src={product.image} alt={product.name} />
        </div>

        <div className="detail-info">
          <span className="badge">{product.category}</span>
          <h1>{product.name}</h1>
          <Rating value={product.rating} reviews={product.reviews} />
          <p className="detail-price">{formatPrice(product.price)}</p>
          <p className="detail-description">{product.description}</p>

          {quantity === 0 ? (
            <button type="button" className="btn btn-primary btn-lg" onClick={() => addToCart(product)}>
              Add to cart
            </button>
          ) : (
            <div className="detail-actions">
              <QuantityControl
                quantity={quantity}
                label={product.name}
                onIncrement={() => increment(product.id)}
                onDecrement={() => decrement(product.id)}
              />
              <button type="button" className="btn btn-ghost" onClick={() => removeFromCart(product.id)}>
                Remove from cart
              </button>
              <Link to="/cart" className="btn btn-primary">Go to cart</Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
