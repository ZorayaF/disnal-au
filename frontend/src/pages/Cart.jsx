// src/pages/Cart.jsx (o Quotation.jsx)

import { useEffect } from "react";
import { useState } from "react";
import { CartList } from "@sections/CartList";
import { CompanyForm } from "@sections/CompanyForm";
import { OrderReview } from "@sections/OrderReview";
import { CheckoutSuccess } from "@sections/CheckoutSuccess";

export const Cart = () => {
  useEffect(() => {
    document.title = "Disnal AU - Shopping Cart";
  }, []);

  // Estado para controlar en qué paso del formulario estamos (Empieza en 1)
  const [step, setStep] = useState(1);

  return (
    <div style={{ padding: "20px" }}>
      {/*  TABLERO TEMPORAL  */}
      <div
        style={{
          background: "#f8fafc",
          padding: "12px",
          marginBottom: "30px",
          borderRadius: "8px",
          border: "1px solid #cbd5e1",
          display: "flex",
          gap: "10px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{ fontSize: "13px", fontWeight: "bold", color: "#475569" }}
        >
          Simulador de Pasos (Desarrollo):
        </span>
        <button
          onClick={() => setStep(1)}
          style={{
            padding: "6px 12px",
            cursor: "pointer",
            background: step === 1 ? "#0284c7" : "#fff",
            color: step === 1 ? "#fff" : "#475569",
            border: "1px solid #cbd5e1",
            borderRadius: "4px",
          }}
        >
          1. Lista de Productos
        </button>
        <button
          onClick={() => setStep(2)}
          style={{
            padding: "6px 12px",
            cursor: "pointer",
            background: step === 2 ? "#0284c7" : "#fff",
            color: step === 2 ? "#fff" : "#475569",
            border: "1px solid #cbd5e1",
            borderRadius: "4px",
          }}
        >
          2. Datos Empresa
        </button>
        <button
          onClick={() => setStep(3)}
          style={{
            padding: "6px 12px",
            cursor: "pointer",
            background: step === 3 ? "#0284c7" : "#fff",
            color: step === 3 ? "#fff" : "#475569",
            border: "1px solid #cbd5e1",
            borderRadius: "4px",
          }}
        >
          3. Revisar Pedido
        </button>
        <button
          onClick={() => setStep(4)}
          style={{
            padding: "6px 12px",
            cursor: "pointer",
            background: step === 4 ? "#0284c7" : "#fff",
            color: step === 4 ? "#fff" : "#475569",
            border: "1px solid #cbd5e1",
            borderRadius: "4px",
          }}
        >
          4. Éxito 🎉
        </button>
      </div>

      {/*  RENDERIZADO CONDICIONAL (Muestra solo la sección activa) */}
      <div>
        {step === 1 && <CartList />}
        {step === 2 && <CompanyForm />}
        {step === 3 && <OrderReview />}
        {step === 4 && <CheckoutSuccess />}
      </div>
    </div>
  );
};
