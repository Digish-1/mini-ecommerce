import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";
import ProductImage from "./ProductImage";
import Rating from "./Rating";

export default function ProductCard({ product }) {
  const { addToCart, getQuantity } = useCart();
  const inCart = getQuantity(product.id);

  return (
    <article className="card">
      <Link to={`/product/${product.id}`} className="card-link" aria-label={`View ${product.name}`}>
        <div className="card-image">
          <ProductImage src={product.image} alt={product.name} />
        </div>
        <div className="card-body">
          <span className="badge">{product.category}</span>
          <h3>{product.name}</h3>
          <Rating value={product.rating} reviews={product.reviews} />
        </div>
      </Link>
      <div className="card-footer">
        <strong className="price">{formatPrice(product.price)}</strong>
        <button type="button" className="btn btn-primary" onClick={() => addToCart(product)}>
          {inCart > 0 ? `Add more (${inCart})` : "Add to cart"}
        </button>
      </div>
    </article>
  );
}
