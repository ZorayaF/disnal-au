// src/hooks/useCompanyFormWhatsApp.js
// Formulario para versión anterior de logica basada en WhatsApp
import { useContext } from "react";
import { CartContext } from "@context/CartContext";
import { crearEstructuraEmpresa } from "@models/Company";
import { WHATSAPP_CONTACT_NUMBER } from "@config/api";

export const useCompanyFormWhatsApp = (datosEmpresa, onSubmit) => {
  const { carrito } = useContext(CartContext);

  const procesarDespachoWhatsApp = () => {
    const infoLimpia = crearEstructuraEmpresa(datosEmpresa);
    const productosACotizar = carrito.filter((item) => !item.conflicto);

    let m = `*DISNAL-AU — NUEVA SOLICITUD DE COTIZACIÓN B2B*\n\n`;
    m += `*DATOS DE LA EMPRESA:*\n`;
    m += `• *Empresa:* ${infoLimpia.nombreEmpresa}\n`;
    if (infoLimpia.razonSocial.trim())
      m += `• *Razon Social:* ${infoLimpia.razonSocial}\n`;
    if (infoLimpia.nitRuc.trim()) m += `• *NIT/RUC:* ${infoLimpia.nitRuc}\n`;
    if (infoLimpia.ciudad.trim()) m += `• *Ciudad:* ${infoLimpia.ciudad}\n\n`;

    m += `*CONTACTO COMERCIAL:*\n`;
    m += `• *Nombre:* ${infoLimpia.nombreContacto}\n`;
    m += `• *Telefono:* ${infoLimpia.telefono}\n`;
    if (infoLimpia.correo.trim()) m += `• *Correo:* ${infoLimpia.correo}\n\n`;

    if (infoLimpia.necesidadesEspecificas.trim()) {
      m += `*NECESIDADES ESPECIFICAS:*\n${infoLimpia.necesidadesEspecificas}\n\n`;
    }

    m += `*INSUMOS SOLICITADOS:*\n`;
    productosACotizar.forEach((item, index) => {
      m += `${index + 1}. ${item.nombre}${item.presentacion ? ` (${item.presentacion})` : ""} x ${item.cantidadEnCarrito || item.cantidad} und.\n`;
    });

    const urlWhatsApp = `https://wa.me/${WHATSAPP_CONTACT_NUMBER}?text=${encodeURIComponent(m)}`;
    window.open(urlWhatsApp, "_blank");

    if (onSubmit) onSubmit();
  };

  return { procesarDespachoWhatsApp };
};
