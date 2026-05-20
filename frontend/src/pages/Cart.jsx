// src/pages/Cart.jsx
import { useEffect } from "react";
import { useCartCheckout } from "@hooks/useCartCheckout";
import { CartList } from "@sections/CartList";
import { CompanyForm } from "@sections/CompanyForm";
import { OrderReview } from "@sections/OrderReview";
import { CheckoutSuccess } from "@sections/CheckoutSuccess";
import { Title } from "@components/ui/Title";

export const Cart = () => {
  const { notificaciones, sincronizando, step, avanzarPaso, ejecutarBarrido } =
    useCartCheckout();

  useEffect(() => {
    document.title = "Disnal AU - Shopping Cart";
  }, []);

  return (
    <div className="p-6 bg-bg-main min-h-screen space-y-6">
      {/* ENCABEZADO DE SECCIÓN */}
      <div className="flex flex-col border-b border-border-component pb-4">
        <Title text="Mi Carrito de Cotización" level={1} />
        <p className="text-text-muted text-sm font-sans mt-1">
          Completa los pasos para enviar la solicitud de insumos a Disnal AU.
        </p>
      </div>

      {/* PANEL DE NOTIFICACIONES ACTIVO */}
      {notificaciones.length > 0 && step === 1 && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2 animate-fade-in">
          <span className="block font-sans text-sm font-bold text-amber-800">
            Cambios en tu inventario detectados:
          </span>
          <ul className="list-disc pl-5 font-sans text-xs text-amber-700 space-y-1">
            {notificaciones.map((nota, idx) => (
              <li key={idx}>{nota}</li>
            ))}
          </ul>
        </div>
      )}

      {/* RENDERIZADO CONDICIONAL DE SECCIONES */}
      <div className="bg-bg-surface rounded-2xl border border-border-component p-6 shadow-sm">
        {sincronizando ? (
          <div className="text-center py-12 font-sans text-sm text-text-muted animate-pulse">
            Verificando disponibilidad y existencias en tiempo real...
          </div>
        ) : (
          <>
            {step === 1 && (
              <CartList
                nextStep={() => avanzarPaso(2)}
                reverificar={ejecutarBarrido}
              />
            )}
            {step === 2 && (
              <CompanyForm
                nextStep={() => avanzarPaso(3)}
                prevStep={() => avanzarPaso(1)}
              />
            )}
            {step === 3 && (
              <OrderReview
                nextStep={() => avanzarPaso(4)}
                prevStep={() => avanzarPaso(2)}
              />
            )}
            {step === 4 && <CheckoutSuccess />}
          </>
        )}
      </div>
    </div>
  );
};
