import { useState } from "react";

// <img> with a graceful fallback if the URL fails to load.
export default function ProductImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`image-fallback ${className}`} role="img" aria-label={alt}>
        <span aria-hidden="true">🖼️</span>
        <small>Image unavailable</small>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
