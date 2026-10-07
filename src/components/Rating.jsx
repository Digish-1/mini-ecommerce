// Renders e.g. ★★★★☆ 4.3 (862)
export default function Rating({ value, reviews }) {
  const full = Math.round(value);

  return (
    <span className="rating" aria-label={`Rated ${value} out of 5`}>
      <span className="rating-stars" aria-hidden="true">
        {"★".repeat(full)}
        {"☆".repeat(5 - full)}
      </span>
      <span className="rating-value">{value.toFixed(1)}</span>
      {reviews != null && <span className="rating-count">({reviews.toLocaleString()})</span>}
    </span>
  );
}
