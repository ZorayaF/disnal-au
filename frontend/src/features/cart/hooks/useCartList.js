// src/hooks/useCartList.js
import { useState } from "react";

export const useCartList = (nextStep, reverificar) => {
  const [validandoStock, setValidandoStock] = useState(false);

  const manejarContinuar = async () => {
    setValidandoStock(true);

    // Dispara la función de barrido heredada del controlador principal
    const todoEstaValido = await reverificar();

    setValidandoStock(false);

    if (todoEstaValido) {
      nextStep();
    }
  };

  return {
    validandoStock,
    manejarContinuar,
  };
};
