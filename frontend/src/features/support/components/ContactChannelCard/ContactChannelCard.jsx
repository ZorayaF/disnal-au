// src/features/support/components/ContactChannelCard/ContactChannelCard.jsx
import { LineIcon } from "@components/ui/LineIcon/LineIcon";

export const ContactChannelCard = ({ icon, title, description, href }) => {
  const content = (
    <>
      {/* 1. CÍRCULO NEGRO: Queda perfectamente centrado gracias al items-center del padre */}
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-black text-white shadow-lg transition-transform duration-200 group-hover:-translate-y-1">
        <LineIcon name={icon} className="h-8 w-8" />
      </div>

      {/* 2. TEXTOS AJUSTADOS: flex-col e items-center para que el título y descripción se centren bajo el círculo */}
      <div className="flex flex-col items-center gap-1 mt-1">
        <strong className="text-white text-xs font-black tracking-[0.25em] leading-normal uppercase font-sans">
          {title}
        </strong>

        {description && (
          <span className="max-w-[12rem] text-white/90 text-sm font-normal leading-relaxed tracking-normal normal-case font-sans">
            {description}
          </span>
        )}
      </div>
    </>
  );

  {
    /* 3. CONFIGURACIÓN CORRECTA DE BASE:
    - w-full: Se extiende para ocupar toda la columna del Grid (hace que las líneas divisorias queden perfectas).
    - items-center: Centra el círculo y el bloque de texto horizontalmente dentro de su espacio.
    - text-center: Centra las líneas de texto una bajo la otra.
    - p-4: Agrega el espacio interno para que el contenido no pegue con las líneas o bordes.
  */
  }
  const baseClassName =
    "group flex flex-col items-center text-center gap-3 w-full p-4 transition-all duration-200";

  if (href) {
    return (
      <a
        className={baseClassName}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }

  return <article className={baseClassName}>{content}</article>;
};
