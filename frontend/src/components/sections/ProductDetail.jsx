// src/components/sections/ProductDetail.jsx
import { useProductDetailSection } from "@hooks/useProductDetailSection";
import { Button } from "@components/ui/Button";
import { Title } from "@components/ui/Title";

export const ProductDetail = ({ producto }) => {
  const {
    cantidadActual,
    esInactivo,
    sinStock,
    limiteAlcanzado,
    manejarAgregar,
  } = useProductDetailSection(producto);

  return (
    <div className="bg-bg-surface border border-border-component p-6 rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
      {/* LADO IZQUIERDO: Galería de fotos del servidor */}
      <div className="space-y-4">
        <div className="aspect-video w-full bg-bg-main rounded-xl overflow-hidden border border-border-component flex items-center justify-center text-text-muted text-sm">
          {producto.imagenes && producto.imagenes.length > 0 ? (
            <img
              src={producto.imagenes[0]}
              alt={producto.nombre}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>Insumo sin imágenes cargadas</span>
          )}
        </div>

        {/* Miniaturas */}
        <div className="grid grid-cols-5 gap-2">
          {producto.imagenes?.map((url, idx) => (
            <div
              key={idx}
              className="aspect-square border border-border-component rounded-lg overflow-hidden bg-bg-main"
            >
              <img
                src={url}
                alt={`Miniatura ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* LADO DERECHO: Ficha Técnico e Interacción */}
      <div className="flex flex-col justify-between">
        <div className="space-y-4">
          <div>
            <span
              className={`inline-block px-2 py-1 rounded-md text-xs font-bold ${
                esInactivo || sinStock
                  ? "bg-red-50 text-red-700"
                  : "bg-green-50 text-green-700"
              }`}
            >
              {esInactivo || sinStock
                ? "NO DISPONIBLE EN BODEGA"
                : "DISPONIBLE"}
            </span>
            <div className="mt-2">
              <Title text={producto.nombre} level={1} />
            </div>
          </div>

          <div className="border-t border-border-component pt-4 space-y-2 text-sm text-text-body">
            <p>
              • <strong>Identificador de Insumo:</strong> #{producto.id}
            </p>
            <p>
              • <strong>Existencias Reales:</strong> {producto.cantidad}{" "}
              unidades disponibles
            </p>
            {cantidadActual > 0 && (
              <p className="text-action-primary font-bold">
                • <strong>Estado de Reserva:</strong> Tienes {cantidadActual}{" "}
                unidades separadas en tu carrito.
              </p>
            )}
          </div>
        </div>

        {/* Botón de acción */}
        <div className="pt-6 border-t border-border-component mt-6">
          {esInactivo || sinStock ? (
            <Button variant="muted" disabled={true} fullWidth={true}>
              Insumo Fuera de Stock Temporal
            </Button>
          ) : (
            <Button
              variant={limiteAlcanzado ? "muted" : "primary"}
              disabled={limiteAlcanzado}
              fullWidth={true}
              onClick={manejarAgregar}
            >
              {limiteAlcanzado
                ? "Cantidad Máxima en Carrito"
                : "Añadir a la Orden de Cotización"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
