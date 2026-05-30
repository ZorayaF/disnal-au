// src/components/ui/Toggle/Toggle.jsx
import React from "react";

export const Toggle = ({
  checked,
  onChange,
  label,
  disabled = false,
  className = "",
}) => {
  return (
    <label
      className={`
        inline-flex items-center gap-3 font-sans text-[0.82rem] font-bold text-disnal-ink select-none
        ${disabled ? "opacity-[0.45] cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `
        .trim()
        .replace(/\s+/g, " ")}
    >
      {/* 🎛️ Contenedor Estructural del Switch */}
      <div className="relative inline-block shrink-0 vertical-middle">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only peer" // Oculta el control nativo manteniendo la accesibilidad ARIA
        />

        {/* 🎨 Cápsula y Canica del Toggle — Adaptado estrictamente para v4 */}
        <div
          className={`
          w-11 h-6 rounded-full transition-colors duration-200 ease-in-out
          bg-gray-200 border border-transparent
          peer-focus:outline-hidden peer-focus:ring-2 peer-focus:ring-disnal-red/[0.24]
          peer-checked:bg-disnal-black peer-checked:border-transparent
          
          after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
          after:w-5 after:h-5 after:rounded-full after:bg-white 
          after:shadow-[0_1px_3px_rgba(0,0,0,0.15)]
          after:transition-transform after:duration-200 after:ease-in-out
          peer-checked:after:translate-x-5
        `}
        ></div>
      </div>

      {/* 🏷️ Texto Descriptivo Correlativo */}
      {label && <span className="leading-none">{label}</span>}
    </label>
  );
};
