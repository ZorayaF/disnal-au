// src/hooks/useCompanyForm.js
import { useState, useContext } from "react";
import { CartContext } from "@context/CartContext";
import { DEFAULT_COMPANY_STATE, crearEstructuraEmpresa } from "@models/Company";
import { WHATSAPP_CONTACT_NUMBER } from "@config/api";

export const useCompanyForm = ({ onSubmit }) => {
  const { carrito } = useContext(CartContext);
  // Consumimos el modelo centralizado
  const [datosEmpresa, setDatosEmpresa] = useState(DEFAULT_COMPANY_STATE);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosEmpresa((prev) => ({ ...prev, [name]: value }));
  };

  const manejarEnvioPedido = (e) => {
    e.preventDefault();
    const infoLimpia = crearEstructuraEmpresa(datosEmpresa);

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

    const productosACotizar = carrito.filter((item) => !item.conflicto);

    let m = `*DISNAL-AU — NUEVA SOLICITUD DE COTIZACIÓN*\n\n`;
    m += `*DATOS DE LA EMPRESA:*\n`;
    m += `• *Empresa:* ${infoLimpia.nombreEmpresa}\n`;
    if (infoLimpia.razonSocial.trim())
      m += `• *Razon Social:* ${infoLimpia.razonSocial}\n`;
    if (infoLimpia.nitRuc.trim()) m += `• *NIT/RUC:* ${infoLimpia.nitRuc}\n`;
    m += `• *Ciudad:* ${infoLimpia.ciudad}\n\n`;

    m += `*CONTACTO COMERCIAL:*\n`;
    m += `• *Nombre:* ${infoLimpia.nombreContacto}\n`;
    m += `• *Telefono:* ${infoLimpia.telefono}\n`;
    if (infoLimpia.correo.trim()) m += `• *Correo:* ${infoLimpia.correo}\n\n`;

    if (infoLimpia.necesidadesEspecificas.trim()) {
      m += `*NECESIDADES ESPECIFICAS:*\n${infoLimpia.necesidadesEspecificas}\n\n`;
    }

    m += `*INSUMOS SOLICITADOS:*\n`;
    productosACotizar.forEach((item, index) => {
      m += `${index + 1}. ${item.nombre}${item.presentacion ? ` (${item.presentacion})` : ""} x ${item.cantidadEnCarrito} und.\n`;
    });

    const urlWhatsApp = `https://wa.me/${WHATSAPP_CONTACT_NUMBER}?text=${encodeURIComponent(m)}`;
    window.open(urlWhatsApp, "_blank");

    // Ejecución segura del callback para avanzar el stepper del checkout
    if (onSubmit) onSubmit();
  };

  return { datosEmpresa, handleInputChange, manejarEnvioPedido };
};
