// src/components/shared/FaqItem/FaqItem.jsx
import React, { useState } from "react";

export const FaqItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <article className="bg-white border border-gray-200 rounded-lg overflow-hidden font-sans shadow-[0_8px_20px_rgba(0,0,0,0.035)] transition-all duration-200">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="w-full bg-white border-0 cursor-pointer flex items-center justify-between gap-4 p-[13px_20px] text-left text-disnal-ink text-[1.02rem] font-medium transition-colors hover:bg-gray-50/50"
      >
        <span className="pr-2">{question}</span>
        <strong className="text-disnal-red text-[1.45rem] leading-none font-medium select-none">
          {open ? "−" : "+"}
        </strong>
      </button>

      {/* 📜 Contenedor animado para la respuesta */}
      <div
        className={`grid transition-all duration-200 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="m-0 p-[0_20px_16px] text-[#555555] text-[0.82rem] leading-relaxed text-left">
            {answer}
          </p>
        </div>
      </div>
    </article>
  );
};
