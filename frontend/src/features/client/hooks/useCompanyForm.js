// src/hooks/useCompanyForm.js
import { useState } from "react";
import { DEFAULT_COMPANY_STATE, crearEstructuraEmpresa } from "@models/Company";
import { MODO_DESPACHO } from "@config/api"; // 🌟 El interruptor global
import { useCompanyFormWhatsApp } from "./useCompanyFormWhatsApp"; // 🌟 Hook A
import { useCompanyFormCRM } from "./useCompanyFormCRM"; // 🌟 Hook B

export const useCompanyForm = ({ onSubmit }) => {
  const [datosEmpresa, setDatosEmpresa] = useState(DEFAULT_COMPANY_STATE);

  // Inicializamos ambos flujos pasándoles los datos reactivos del formulario y el callback
  const { procesarDespachoWhatsApp } = useCompanyFormWhatsApp(
    datosEmpresa,
    onSubmit,
  );
  const { procesarDespachoCRM } = useCompanyFormCRM(datosEmpresa, onSubmit);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosEmpresa((prev) => ({ ...prev, [name]: value }));
  };

  const manejarEnvioPedido = (e) => {
    e.preventDefault();
    const infoLimpia = crearEstructuraEmpresa(datosEmpresa);

    // Validación unificada para ambos mundos
    if (
      !infoLimpia.nombreEmpresa.trim() ||
      !infoLimpia.nombreContacto.trim() ||
      !infoLimpia.telefono.trim()
    ) {
      alert(
        "Por favor, completa los campos obligatorios (Nombre de la empresa, Nombre de contacto y Telefono).",
      );
      return;
    }

    // 🔀 EL INTERRUPTOR INVISIBLE DE ARQUITECTURA
    if (MODO_DESPACHO === "WHATSAPP") {
      procesarDespachoWhatsApp();
    } else {
      procesarDespachoCRM();
    }
  };

  return { datosEmpresa, handleInputChange, manejarEnvioPedido };
};
