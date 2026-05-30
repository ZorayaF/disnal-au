// src/components/common/Footer/Footer.jsx
import { Link } from "react-router-dom";

const LOGO_SRC = "/assets/images/png logo disnal.png";

const NAV_LINKS = [
  { label: "Inicio", to: "/" },
  { label: "Catálogo", to: "/catalog" },
  { label: "Cotización", to: "/cart" },
  { label: "Asesoría", to: "/consulting" },
  { label: "Legal", to: "/legal" },
];

const CONTACT_ITEMS = [
  {
    icon: (
      <svg
        className="w-3.5 h-3.5 text-disnal-red shrink-0 mt-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.58 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
      </svg>
    ),
    content: (
      <a
        href="tel:+576011234567"
        className="text-disnal-gray text-[0.82rem] leading-normal no-underline hover:text-white transition-colors duration-200"
      >
        Silvia +57 (601) 123 4567
      </a>
    ),
  },
  {
    icon: (
      <svg
        className="w-3.5 h-3.5 text-disnal-red shrink-0 mt-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    content: (
      <a
        href="mailto:comercial@disnalau.com"
        className="text-disnal-gray text-[0.82rem] leading-normal no-underline hover:text-white transition-colors duration-200"
      >
        comercial@disnalau.com
      </a>
    ),
  },
  {
    icon: (
      <svg
        className="w-3.5 h-3.5 text-disnal-red shrink-0 mt-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    content: (
      <span className="text-disnal-gray text-[0.82rem] leading-normal">
        Lun – Vie: 8:00 am – 5:00 pm
      </span>
    ),
  },
  {
    icon: (
      <svg
        className="w-3.5 h-3.5 text-disnal-red shrink-0 mt-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    content: (
      <span className="text-disnal-gray text-[0.82rem] leading-normal">
        Bogotá, Colombia
      </span>
    ),
  },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        className="w-3.5 h-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon
          points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
          fill="#0e0e0e"
        />
      </svg>
    ),
  },
];

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0e0e0e] font-sans text-white border-t border-white/5 overflow-hidden">
      {/* ── BANDA PRINCIPAL RESPONSIVA ── */}
      <div className="grid grid-cols-1 max-lg:grid-cols-3 max-md:grid-cols-1 items-start max-w-[1400px] my-0 mx-auto p-[36px_20px_32px] md:p-[44px_32px_40px] lg:p-[56px_40px_48px] lg:grid-cols-[220px_1fr_1fr_1fr_1.1fr] gap-7 lg:gap-0">
        {/* Columna 1 — Marca */}
        <div className="flex flex-col gap-5 max-lg:col-span-full max-lg:flex-row max-lg:items-start max-lg:gap-8 max-lg:pb-8 max-lg:border-b max-lg:border-white/5 max-md:flex-col max-md:gap-4 lg:pr-[clamp(20px,2.5vw,40px)]">
          <img
            src={LOGO_SRC}
            alt="Disnal AU"
            className="w-[120px] h-auto block"
          />
          <div className="flex flex-col gap-4">
            <p className="text-disnal-gray text-[0.78rem] font-normal leading-relaxed max-w-[190px] max-lg:max-w-[280px]">
              Distribuimos productos alimenticios de calidad con compromiso,
              frescura y confianza.
            </p>

            {/* Íconos sociales compactos */}
            <div className="flex gap-2 mt-1" aria-label="Redes sociales">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid place-items-center w-7.5 h-7.5 rounded-full border border-white/5 text-disnal-gray no-underline transition-all duration-200 cubic-bezier(0.4,0,0.2,1) hover:bg-disnal-red hover:border-disnal-red hover:text-white hover:-translate-y-0.5"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Columna 2 — Menú rápido */}
        <nav
          className="flex flex-col gap-2.5 lg:border-l lg:border-white/5 lg:pl-[clamp(24px,3vw,48px)] lg:pr-[clamp(20px,2.5vw,40px)]"
          aria-label="Menú rápido"
        >
          <span className="text-[0.62rem] font-semibold tracking-[0.16em] uppercase text-[#555555] mb-1.5 pb-2.5 border-b border-white/5">
            Menú
          </span>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative inline-flex items-center gap-1.75 text-disnal-gray text-[0.84rem] font-normal no-underline py-0.75 w-fit transition-all duration-200 before:content-[''] before:w-0 before:h-[1px] before:bg-disnal-red before:transition-all before:duration-200 hover:text-white hover:gap-2.75 hover:before:w-3"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/login"
            className="inline-flex items-center mt-2 px-4 py-1.75 border-1.5 border-disnal-red/50 rounded-full text-disnal-red text-[0.65rem] font-semibold tracking-wider uppercase no-underline w-fit transition-colors duration-200 hover:bg-disnal-red hover:border-disnal-red hover:text-white"
          >
            Acceso Admin
          </Link>
        </nav>

        {/* Columna 3 — Contacto */}
        <div
          className="flex flex-col gap-2.5 lg:border-l lg:border-white/5 lg:pl-[clamp(24px,3vw,48px)] lg:pr-[clamp(20px,2.5vw,40px)]"
          aria-label="Contáctanos"
        >
          <span className="text-[0.62rem] font-semibold tracking-[0.16em] uppercase text-[#555555] mb-1.5 pb-2.5 border-b border-white/5">
            Contáctanos
          </span>
          {CONTACT_ITEMS.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 py-0.75">
              {item.icon}
              {item.content}
            </div>
          ))}
        </div>

        {/* Columna 4 — Redes (lista) */}
        <div
          className="flex flex-col gap-2.5 lg:border-l lg:border-white/5 lg:pl-[clamp(24px,3vw,48px)] lg:pr-[clamp(20px,2.5vw,40px)]"
          aria-label="Síguenos"
        >
          <span className="text-[0.62rem] font-semibold tracking-[0.16em] uppercase text-[#555555] mb-1.5 pb-2.5 border-b border-white/5">
            Síguenos
          </span>
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 text-disnal-gray text-[0.82rem] no-underline py-1 w-fit transition-all duration-200 hover:text-white hover:translate-x-0.75 group"
            >
              <span className="text-[#555555] group-hover:text-disnal-red transition-colors duration-200">
                {s.icon}
              </span>
              {s.label}
            </a>
          ))}
        </div>

        {/* Columna 5 — Compromisos + legal */}
        <div className="flex flex-col gap-2.5 lg:border-l lg:border-white/5 lg:pl-[clamp(24px,3vw,48px)]">
          <span className="text-[0.62rem] font-semibold tracking-[0.16em] uppercase text-[#555555] mb-1.5 pb-2.5 border-b border-white/5">
            Nuestros compromisos
          </span>
          <p className="font-display text-2xl max-md:text-xl font-normal tracking-normal leading-[1.1] text-white mb-1">
            Calidad,
            <br />
            confianza
            <br />y <em className="text-disnal-red not-italic">servicio</em>
          </p>
          <p className="text-disnal-gray text-[0.75rem] leading-relaxed mb-4">
            que impulsará tu negocio.
          </p>
          <Link
            to="/legal"
            className="inline-flex text-[#555555] text-[0.69rem] font-medium tracking-wide uppercase no-underline py-0.75 w-fit transition-colors duration-200 hover:text-white"
          >
            Términos y condiciones
          </Link>
          <Link
            to="/legal"
            className="inline-flex text-[#555555] text-[0.69rem] font-medium tracking-wide uppercase no-underline py-0.75 w-fit transition-colors duration-200 hover:text-white"
          >
            Política de privacidad
          </Link>
          <Link
            to="/legal"
            className="inline-flex text-[#555555] text-[0.69rem] font-medium tracking-wide uppercase no-underline py-0.75 w-fit transition-colors duration-200 hover:text-white"
          >
            Aviso legal
          </Link>
        </div>
      </div>

      {/* ── BANDA COPYRIGHT ── */}
      <div className="border-t border-white/5 bg-disnal-red p-[13px_20px] md:p-[13px_40px] flex items-center justify-center text-center">
        <span className="text-white text-[0.65rem] font-medium tracking-[0.1em] uppercase">
          © {year} Disnal AU — Todos los derechos reservados
        </span>
      </div>
    </footer>
  );
};
