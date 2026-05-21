// src/pages/Cart.jsx
import { useEffect } from "react";
import { useCartCheckout } from "@hooks/useCartCheckout";
import { CartList } from "@sections/CartList";
import { CompanyForm } from "@sections/CompanyForm";

export const Cart = () => {
  const { notificaciones, sincronizando, step, avanzarPaso, ejecutarBarrido } =
    useCartCheckout();

  useEffect(() => {
    document.title = "Disnal AU - Shopping Cart";
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div>
        <h1>Mi Carrito de Cotización</h1>
        <p>Completa los pasos para enviar la solicitud de insumos.</p>
      </div>

      {/* Alertas simplificadas en texto plano */}
      {notificaciones.length > 0 && step === 1 && (
        <div
          style={{
            border: "1px solid orange",
            padding: "10px",
            background: "#fff9e6",
            color: "brown",
          }}
        >
          <strong>Cambios en tu inventario detectados:</strong>
          <ul>
            {notificaciones.map((nota, idx) => (
              <li key={idx}>{nota}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Flujo de secciones condicionales sin animaciones ni dependencias complejas */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          background: "#fff",
        }}
      >
        {sincronizando ? (
          <p>Verificando disponibilidad y existencias en tiempo real...</p>
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
              <div style={{ textAlign: "center" }}>
                <h3>Paso 3: Revisión Final Completa</h3>
                <p>Tus datos y productos están listos.</p>
                <button onClick={() => avanzarPaso(4)}>
                  Enviar a WhatsApp
                </button>
                <button
                  onClick={() => avanzarPaso(2)}
                  style={{ marginLeft: "10px" }}
                >
                  Atrás
                </button>
              </div>
            )}

            {step === 4 && (
              <div style={{ textAlign: "center", color: "green" }}>
                <h3>¡Solicitud Enviada Exitosamente!</h3>
                <p>
                  Tu mensaje ha sido empaquetado y despachado hacia el canal de
                  atención.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
