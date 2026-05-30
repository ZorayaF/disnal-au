// src/features/cart/components/OrderReview.jsx
import React, { useContext } from "react";
import { CartContext } from "@context/CartContext";
import { CheckoutStepper } from "@/features/cart/components/CheckoutStepper";
import { Button } from "@components/ui/Button/Button";

export const OrderReview = ({
  companyData,
  onConfirm,
  onBack,
  submitting = false,
}) => {
  const { carrito } = useContext(CartContext);

  // Capa defensiva para asegurar el filtrado correcto del carrito
  const productos = (carrito || []).filter(
    (item) => !item.conflicto && Number(item.cantidadEnCarrito) > 0,
  );

  const unidades = productos.reduce(
    (acc, item) => acc + Number(item.cantidadEnCarrito || 0),
    0,
  );

  return (
    <section
      className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl border border-disnal-line shadow-sm text-disnal-ink font-sans"
      aria-labelledby="order-review-title"
    >
      <div className="mb-8">
        <CheckoutStepper currentStep={2} />
      </div>

      <div className="space-y-6">
        <div>
          <h1
            id="order-review-title"
            className="text-xl font-black text-disnal-black uppercase tracking-tight"
          >
            Revisión de la orden
          </h1>
          <p className="text-sm text-disnal-gray font-medium mt-0.5">
            Verifica tus datos y productos antes de confirmar la solicitud.
          </p>
        </div>

        {/* Rejilla de Información Dinámica */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Datos Organizacionales */}
          <article className="border border-disnal-line/60 bg-disnal-black/[0.01] rounded-lg p-5 space-y-3">
            <h2 className="text-xs font-black uppercase tracking-disnal-nav text-disnal-black border-b border-disnal-line pb-2">
              Datos de empresa
            </h2>
            <dl className="text-sm space-y-2.5">
              <div className="flex justify-between items-baseline gap-4">
                <dt className="text-xs font-bold text-disnal-gray uppercase tracking-wider shrink-0">
                  Empresa
                </dt>
                <dd className="font-black text-disnal-black text-right">
                  {companyData?.nombreEmpresa}
                </dd>
              </div>
              <div className="flex justify-between items-baseline gap-4">
                <dt className="text-xs font-bold text-disnal-gray uppercase tracking-wider shrink-0">
                  RUC / NIT
                </dt>
                <dd className="font-mono text-xs text-disnal-ink/90 bg-white border border-disnal-line/40 px-1.5 py-0.5 rounded font-black">
                  {companyData?.nitRuc}
                </dd>
              </div>
              <div className="flex justify-between items-baseline gap-4">
                <dt className="text-xs font-bold text-disnal-gray uppercase tracking-wider shrink-0">
                  Contacto
                </dt>
                <dd className="font-medium text-disnal-ink text-right">
                  {companyData?.nombreContacto}
                </dd>
              </div>
              <div className="flex justify-between items-baseline gap-4">
                <dt className="text-xs font-bold text-disnal-gray uppercase tracking-wider shrink-0">
                  Correo
                </dt>
                <dd className="font-mono text-xs text-disnal-gray text-right">
                  {companyData?.correo}
                </dd>
              </div>
              <div className="flex justify-between items-baseline gap-4">
                <dt className="text-xs font-bold text-disnal-gray uppercase tracking-wider shrink-0">
                  Teléfono
                </dt>
                <dd className="font-bold text-disnal-black text-right">
                  {companyData?.telefono}
                </dd>
              </div>
            </dl>
          </article>

          {/* Cuadro Resumen B2B */}
          <article className="border border-disnal-line/60 bg-disnal-black/[0.01] rounded-lg p-5 space-y-3">
            <h2 className="text-xs font-black uppercase tracking-disnal-nav text-disnal-black border-b border-disnal-line pb-2">
              Resumen
            </h2>
            <dl className="text-sm space-y-2.5">
              <div className="flex justify-between items-baseline">
                <dt className="text-xs font-bold text-disnal-gray uppercase tracking-wider">
                  Productos
                </dt>
                <dd className="font-mono font-black text-disnal-black">
                  {productos.length}
                </dd>
              </div>
              <div className="flex justify-between items-baseline">
                <dt className="text-xs font-bold text-disnal-gray uppercase tracking-wider">
                  Unidades
                </dt>
                <dd className="font-mono font-black text-disnal-red text-base">
                  {unidades}
                </dd>
              </div>
              <div className="flex justify-between items-baseline">
                <dt className="text-xs font-bold text-disnal-gray uppercase tracking-wider">
                  Estado
                </dt>
                <dd className="inline-block px-2.5 py-0.5 text-xs font-black uppercase tracking-wide bg-amber-50 text-amber-700 border border-amber-200 rounded">
                  Pendiente
                </dd>
              </div>
            </dl>
          </article>
        </div>

        {/* Instrucciones Adicionales del Cliente */}
        {companyData?.necesidadesEspecificas && (
          <div className="bg-amber-50/50 border border-amber-200/60 p-4 rounded-lg text-sm text-disnal-ink">
            <strong className="text-xs font-black uppercase tracking-wider text-amber-800 block mb-1">
              Notas operacionales especificadas:
            </strong>
            <p className="italic font-medium text-disnal-ink/80">
              "{companyData.necesidadesEspecificas}"
            </p>
          </div>
        )}

        {/* Listado Consolidado de Insumos Solicitados */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-black uppercase tracking-disnal-nav text-disnal-gray">
            Insumos incluidos en la solicitud ({productos.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {productos.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-3 bg-disnal-black/[0.02] border border-disnal-line/60 rounded text-xs font-bold"
              >
                <span className="text-disnal-black uppercase truncate max-w-[75%]">
                  {item.nombre}
                </span>
                <span className="font-mono bg-white border border-disnal-line/40 px-2 py-0.5 rounded text-disnal-red font-black shrink-0 shadow-2xs">
                  {item.cantidadEnCarrito} und.
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Barra de Acciones del Checkout */}
        <div className="flex justify-end gap-3 border-t border-disnal-line/60 pt-4 mt-6">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onBack}
            disabled={submitting}
            className="!text-disnal-gray border-disnal-line hover:bg-disnal-black/5"
          >
            Atrás
          </Button>

          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={onConfirm}
            disabled={submitting || productos.length === 0}
          >
            {submitting ? "Enviando..." : "Confirmar Orden"}
          </Button>
        </div>
      </div>
    </section>
  );
};
