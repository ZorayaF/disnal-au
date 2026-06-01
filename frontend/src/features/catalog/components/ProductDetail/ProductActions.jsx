// src/features/catalog/components/ProductActions.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
// Importamos el contexto de seguridad global
import { AuthContext } from "@context/AuthContext";

const IconCart = () => (
  <svg
    className="w-[18px] h-[18px] shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);
const IconInfo = () => (
  <svg
    className="w-4 h-4 shrink-0 text-blue-700"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export const ProductActions = ({
  producto,
  isAuthenticated,
  cantidadActual,
  limiteAlcanzado,
  disponible,
  cantidad,
  setCantidad,
  handleAgregar,
}) => {
  // 🎯 SOLUCIÓN DEFINITIVA: Leemos el rol real guardado en el disco y en memoria de la app
  const { usuario } = useContext(AuthContext);
  const esAdminReal = usuario?.rol === "admin";

  const maxDisponible = producto.cantidad - cantidadActual;

  const handleInputChange = (e) => {
    const valor = parseInt(e.target.value, 10);
    if (isNaN(valor) || valor < 1) {
      setCantidad(1);
    } else if (valor > maxDisponible) {
      setCantidad(maxDisponible);
    } else {
      setCantidad(valor);
    }
  };

  return (
    <div className="w-full">
      {/* Alerta unidades en carrito (Solo si es cliente) */}
      {isAuthenticated && !esAdminReal && cantidadActual > 0 && (
        <div
          className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg mb-4 text-sm text-blue-700 border border-blue-100"
          role="alert"
        >
          <IconInfo />
          <span>
            Tienes{" "}
            <strong className="font-bold">{cantidadActual} unidades</strong>{" "}
            agregadas al carrito.
          </span>
        </div>
      )}

      {/* Presentación */}
      <p className="text-sm font-bold text-[#0b0b0b] mb-4">
        Presentación de despacho:{" "}
        <span className="text-red-600 ml-0.5">
          {producto.presentacion || "Empaque original de fábrica"}
        </span>
      </p>

      {/* Acciones principales */}
      {isAuthenticated ? (
        // 🎯 FORZADO: Si el rol es admin, el bloque de compra DESAPARECE por completo de la pantalla
        !esAdminReal ? (
          <div className="flex flex-col gap-3 w-full">
            {/* Stepper de cantidad con Input */}
            <div className="flex items-center justify-between px-4 py-2.5 border border-neutral-200 rounded-full bg-neutral-50">
              <span className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-neutral-500 select-none">
                Cantidad
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                  disabled={cantidad <= 1}
                  className="w-8 h-8 rounded-full border border-neutral-300 bg-white flex items-center justify-center text-neutral-600 font-bold text-lg transition-all hover:border-red-600 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  −
                </button>

                <input
                  type="number"
                  min="1"
                  max={maxDisponible}
                  value={cantidad}
                  onChange={handleInputChange}
                  disabled={maxDisponible <= 0 || limiteAlcanzado}
                  className="w-16 text-center font-black text-[#0b0b0b] bg-transparent border-0 outline-none p-0 font-sans text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setCantidad((c) => Math.min(maxDisponible, c + 1))
                  }
                  disabled={cantidad >= maxDisponible || limiteAlcanzado}
                  className="w-8 h-8 rounded-full border border-neutral-300 bg-white flex items-center justify-center text-neutral-600 font-bold text-lg transition-all hover:border-red-600 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Botón de Cotización */}
            <button
              onClick={handleAgregar}
              disabled={!disponible || limiteAlcanzado}
              className={`flex items-center justify-center gap-2.5 w-full py-4 px-6 border-0 text-xs
                font-black tracking-wider uppercase cursor-pointer rounded-full select-none transition-all
                ${
                  disponible && !limiteAlcanzado
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/20 hover:bg-red-700 active:scale-[0.99]"
                    : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                }`}
            >
              <IconCart />
              {!disponible
                ? "Insumo sin stock"
                : limiteAlcanzado
                  ? "Límite máximo alcanzado"
                  : `Añadir${cantidad > 1 ? ` ${cantidad} unidades` : ""} a la cotización`}
            </button>
          </div>
        ) : (
          /* 💼 Interfaz de Solo Lectura para el Administrador */
          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-center text-xs font-semibold text-neutral-500 font-sans uppercase tracking-wider">
            Visor de Inventario (Solo Lectura Administrativa)
          </div>
        )
      ) : (
        /* Banner Invitados */
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center flex flex-col items-center gap-3">
          <p className="m-0 text-sm text-amber-700 font-semibold">
            ⚠️ Precios y volúmenes mayoristas protegidos.
          </p>
          <Link
            to="/login-cliente"
            className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors shadow-md shadow-amber-500/10"
          >
            <IconCart />
            Iniciar Sesión para Cotizar
          </Link>
        </div>
      )}
    </div>
  );
};
