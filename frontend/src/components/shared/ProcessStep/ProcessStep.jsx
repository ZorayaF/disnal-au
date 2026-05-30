// src/components/shared/ProcessStep/ProcessStep.jsx
export const ProcessStep = ({ number, title, text }) => (
  <article className="relative grid justify-items-center text-center gap-3.25 font-sans group">
    {/* 🔴 Burbuja Numérica Flotante e Institucional */}
    <span
      className="w-[66px] h-[66px] rounded-full bg-disnal-red text-white grid place-items-center text-1rem font-black select-none transition-transform duration-250 ease-in-out group-hover:scale-105 shadow-md"
      aria-hidden="true"
    >
      {number}
    </span>

    {/* 🏷️ Bloque de Texto Informativo */}
    <div className="flex flex-col gap-1 max-w-[240px]">
      <h3 className="m-0 text-disnal-black text-[0.74rem] font-bold tracking-wide uppercase font-sans">
        {title}
      </h3>

      {text && (
        <p className="m-0 text-[#555555] text-[0.72rem] leading-[1.38] font-normal font-sans">
          {text}
        </p>
      )}
    </div>
  </article>
);
