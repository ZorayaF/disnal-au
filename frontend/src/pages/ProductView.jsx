// src/pages/ProductView.jsx
import { useEffect } from "react";
import { useProductDetail } from "@hooks/useProductDetail";
import { ProductDetail } from "@sections/ProductDetail";

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
      <p style={{ padding: "20px" }}>Cargando especificaciones técnicas...</p>
    );
  }

  if (!producto) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>El insumo solicitado no existe en el sistema.</p>
        <button onClick={irAlCatalogo}>Volver al Catálogo</button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      {/* Botón de escape nativo */}
      <div>
        <button onClick={volverAtras}>Volver atrás</button>
      </div>

      {/* 1. Sección de la Ficha Técnica Simplificada */}
      <ProductDetail producto={producto} />

      {/* 2. Bloque de recomendados independiente (Sin romper contratos con el catálogo) */}
      <div>
        <h2>Productos Relacionados</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            marginTop: "10px",
          }}
        >
          {productosRelacionados.map((rel) => (
            <div
              key={rel.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                width: "180px",
                background: "#fff",
              }}
            >
              <h4>{rel.nombre}</h4>
              <p style={{ fontSize: "12px", color: "#666" }}>
                Marca: {rel.marca}
              </p>
              <p style={{ fontSize: "12px", color: "#666" }}>
                Empaque: {rel.presentacion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
