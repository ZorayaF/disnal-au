// src/components/shared/QuantityStepper/QuantityStepper.jsx
import React from "react";

export const QuantityStepper = ({
  value = 1,
  onDecrease,
  onIncrease,
  disabled = false,
  disableDecrease = false,
  disableIncrease = false,
}) => {
  return (
    <div
      className="inline-grid grid-cols-[2rem_2.6rem_2rem] overflow-hidden rounded-full border border-disnal-ink bg-white text-disnal-ink font-sans shadow-xs select-none"
      aria-label="Selector de cantidad mayorista"
    >
      {/* ➖ Botón de Disminución */}
      <button
        type="button"
        onClick={onDecrease}
        disabled={disabled || disableDecrease || value <= 1}
        aria-label="Disminuir cantidad"
        className="grid h-7 place-items-center border-0 border-r border-disnal-ink bg-white text-base leading-none cursor-pointer font-black transition-colors duration-150 hover:not-disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-[0.35]"
      >
        −
      </button>

      {/* 🔢 Indicador Numérico Central */}
      <span
        className="grid h-7 place-items-center text-[0.78rem] font-black tracking-[0.12em]"
        aria-live="polite"
      >
        {value}
      </span>

      {/* ➕ Botón de Aumento */}
      <button
        type="button"
        onClick={onIncrease}
        disabled={disabled || disableIncrease}
        aria-label="Aumentar cantidad"
        className="grid h-7 place-items-center border-0 border-l border-disnal-ink bg-white text-base leading-none cursor-pointer font-black transition-colors duration-150 hover:not-disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-[0.35]"
      >
        +
      </button>
    </div>
  );
};
