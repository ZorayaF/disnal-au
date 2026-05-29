// src/hooks/useContactForm.js
import { useState } from "react";
import {
  DEFAULT_CONTACT_STATE,
  crearEstructuraConsulta,
} from "@models/Contact";
import { WHATSAPP_CONTACT_NUMBER } from "@config/api";

export const useContactForm = () => {
  // Consumimos el modelo de consulta centralizado
  const [datosConsulta, setDatosConsulta] = useState(DEFAULT_CONTACT_STATE);
  const [enviando, setEnviando] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosConsulta((prev) => ({ ...prev, [name]: value }));
  };

  const manejarEnvioConsulta = async (e) => {
    e.preventDefault();
    const infoLimpia = crearEstructuraConsulta(datosConsulta);

    if (
      !infoLimpia.nombreCompleto.trim() ||
      !infoLimpia.nombreEmpresa.trim() ||
      !infoLimpia.correoEmpresarial.trim() ||
      !infoLimpia.asunto.trim() ||
      !infoLimpia.mensaje.trim()
    ) {
      alert("Por favor, completa todos los campos obligatorios (*).");
      return;
    }

    setEnviando(true);

    let m = `*DISNAL-AU — NUEVA CONSULTA DE CLIENTE*\n\n`;
    m += `*INFORMACIÓN CORPORATIVA:*\n`;
    m += `• *Empresa:* ${infoLimpia.nombreEmpresa}\n`;
    if (infoLimpia.cargo.trim()) m += `• *Cargo:* ${infoLimpia.cargo}\n\n`;

    m += `*DATOS DE CONTACTO:*\n`;
    m += `• *Nombre:* ${infoLimpia.nombreCompleto}\n`;
    m += `• *Correo:* ${infoLimpia.correoEmpresarial}\n`;
    if (infoLimpia.telefono.trim())
      m += `• *Teléfono:* ${infoLimpia.telefono}\n\n`;

    m += `*DETALLES DE LA CONSULTA:*\n`;
    m += `• *Asunto:* ${infoLimpia.asunto}\n`;
    m += `• *Mensaje:* ${infoLimpia.mensaje}\n`;

    const urlWhatsApp = `https://wa.me/${WHATSAPP_CONTACT_NUMBER}?text=${encodeURIComponent(m)}`;
    window.open(urlWhatsApp, "_blank");
    setDatosConsulta(DEFAULT_CONTACT_STATE);
    setEnviando(false);
  };

  return { datosConsulta, handleInputChange, manejarEnvioConsulta, enviando };
};
