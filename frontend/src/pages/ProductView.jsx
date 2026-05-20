// src/pages/ProductView.jsx
import { useEffect } from "react";
import { useProductDetail } from "@hooks/useProductDetail";
import { ProductDetail } from "@sections/ProductDetail";
import { ProductGrid } from "@sections/ProductGrid";
import { Button } from "@components/ui/Button";

export const ProductView = () => {
  const {
    producto,
    productosRelacionados,
    cargando,
    volverAtras,
    irAlCatalogo,
  } = useProductDetail();

  useEffect(() => {
    document.title = "Disnal AU - Detalle de Insumo";
  }, []);

  if (cargando) {
    return (
      <div className="text-center py-12 font-sans text-sm text-text-muted">
        Cargando specifications técnicas...
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="text-center py-12 font-sans space-y-4">
        <p className="text-text-body font-semibold">
          El insumo solicitado no existe en el sistema.
        </p>
        <Button onClick={irAlCatalogo}>Volver al Catálogo</Button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-bg-main min-h-screen flex flex-col gap-10">
      {/* Botón de escape */}
      <div>
        <Button variant="secondary" onClick={volverAtras}>
          Volver atrás
        </Button>
      </div>

      {/* 1. Sección de la Ficha Técnica */}
      <ProductDetail producto={producto} />

      {/* 2. Bloque de recomendados */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-sans text-text-body px-2">
          Productos Relacionados
        </h2>
        <ProductGrid productos={productosRelacionados} />
      </div>
    </div>
  );
};
