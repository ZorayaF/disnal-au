// src/hooks/useCompanyForm.js
import { useState, useContext } from "react";
import { CartContext } from "@context/CartContext";

export const useCompanyForm = (nextStep) => {
  const { carrito } = useContext(CartContext);
  const [nombreEmpresa, setNombreEmpresa] = useState("");
  const [telefono, setTelefono] = useState("");

  const manejarEnvioPedido = (e) => {
    e.preventDefault();

    if (!nombreEmpresa.trim() || !telefono.trim()) {
      alert("Por favor, ingresa el nombre de la empresa y tu teléfono.");
      return;
    }

    const productosACotizar = carrito.filter((item) => !item.conflicto);

    let textoMensaje = `*DISNAL-AU — NUEVA SOLICITUD DE COTIZACIÓN*\n\n`;
    textoMensaje += `* DATOS DEL CLIENTE:*\n`;
    textoMensaje += `• *Empresa/Panadería:* ${nombreEmpresa}\n`;
    textoMensaje += `• *Teléfono:* ${telefono}\n\n`;
    textoMensaje += `* INSUMOS SOLICITADOS:*\n`;

    productosACotizar.forEach((item, index) => {
      textoMensaje += `${index + 1}. ${item.nombre} x ${item.cantidadEnCarrito} und.\n`;
    });

    textoMensaje += `\n_Mensaje enviado desde el catálogo web de Disnal-AU._`;

    const mensajeCodificado = encodeURIComponent(textoMensaje);
    const numeroDisnal = "57300000000";
    const urlWhatsApp = `https://wa.me/${numeroDisnal}?text=${mensajeCodificado}`;

    window.open(urlWhatsApp, "_blank");
    nextStep();
  };

  return {
    nombreEmpresa,
    setNombreEmpresa,
    telefono,
    setTelefono,
    manejarEnvioPedido,
  };
};
