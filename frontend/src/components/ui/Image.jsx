// src/components/ui/Image.jsx
import { useState } from "react";

export const Image = ({
  src,
  alt,
  className = "",
  aspectRatio = "aspect-square",
}) => {
  const [hasError, setHasError] = useState(false);

  // URL de una imagen de marcador de posición (placeholder) si la real falla
  const fallbackUrl =
    "https://placehold.co/600x600/e2e8f0/94a3b8?text=Image+Not+Available";

  return (
    <div
      className={`overflow-hidden bg-bg-main rounded-lg ${aspectRatio} ${className}`}
    >
      <img
        src={hasError ? fallbackUrl : src}
        alt={alt}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transition-opacity duration-300"
        loading="lazy" // Optimización de rendimiento de usabilidad
      />
    </div>
  );
};
