// src/features/cart/components/CheckoutSuccess.jsx
import React from "react";
import { Link } from "react-router-dom";
import { CheckoutStepper } from "@features/cart/components/CheckoutStepper";
import { LineIcon } from "@components/ui/LineIcon";

export const CheckoutSuccess = ({
  requestNumber = "00000123",
  status = "Pendiente",
}) => (
  <section
    className="w-full max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-xl border border-disnal-line shadow-sm text-disnal-ink font-sans"
    aria-labelledby="checkout-success-title"
  >
    <h1 id="checkout-success-title" className="sr-only">
      Confirmación
    </h1>

    <div className="mb-8">
      <CheckoutStepper currentStep={3} />
    </div>

    <article className="text-center flex flex-col items-center max-w-lg mx-auto space-y-5">
      {/* Icono de Éxito Corporativo */}
      <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center text-2xl animate-bounce font-black">
        <LineIcon name="check" className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-black text-disnal-black uppercase tracking-tight">
          ¡Solicitud enviada con éxito!
        </h2>
        <p className="text-sm text-disnal-gray font-medium leading-relaxed">
          Hemos recibido tu solicitud de confirmación. Un asesor comercial de{" "}
          <span className="font-black text-disnal-red">Disnal AU</span> se
          pondrá en contacto contigo lo antes posible para formalizar el
          despacho.
        </p>
      </div>

      {/* Lista de Detalles Operativos */}
      <dl className="w-full bg-disnal-black/[0.02] border border-disnal-line/60 rounded-lg p-4 grid grid-cols-2 gap-4 divide-x divide-disnal-line/40 text-sm">
        <div className="flex flex-col items-center justify-center">
          <dt className="text-xs font-black uppercase tracking-wider text-disnal-gray mb-1">
            N° Solicitud
          </dt>
          <dd className="font-mono font-black text-disnal-black bg-white border border-disnal-line/50 px-2.5 py-0.5 rounded shadow-2xs text-xs">
            {requestNumber}
          </dd>
        </div>
        <div className="flex flex-col items-center justify-center">
          <dt className="text-xs font-black uppercase tracking-wider text-disnal-gray mb-1">
            Estado Actual
          </dt>
          <dd className="inline-block px-2.5 py-0.5 text-xs font-black uppercase tracking-wide bg-amber-50 text-amber-700 border border-amber-200 rounded">
            {status}
          </dd>
        </div>
      </dl>

      {/* Botón Maestro de Retorno */}
      <div className="w-full pt-2">
        <Link
          to="/"
          className={`
            inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 
            bg-disnal-black hover:bg-disnal-black-soft text-white text-xs font-black 
            uppercase tracking-disnal-nav rounded transition-all duration-[160ms] ease-in-out
            rounded-tl-full rounded-tr-full rounded-bl-full rounded-br-none hover:-translate-y-[1px]
          `
            .trim()
            .replace(/\s+/g, " ")}
        >
          Volver al inicio
        </Link>
      </div>

      {/* Canales Alternativos de Atención */}
      <div className="w-full pt-4 border-t border-dashed border-disnal-line/60 space-y-3">
        <p className="text-xs font-bold text-disnal-gray uppercase tracking-wider">
          También puedes contactarnos directamente:
        </p>
        <div className="flex flex-wrap justify-center gap-2 text-xs font-black uppercase tracking-wider">
          <a
            href="https://wa.me/573118572322"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-colors flex items-center gap-1"
          >
            WhatsApp
          </a>
          <a
            href="mailto:comercial@disnalau.com"
            className="px-3 py-1.5 bg-disnal-black/[0.04] text-disnal-black hover:bg-disnal-black/[0.08] border border-disnal-line/60 rounded transition-colors flex items-center gap-1"
          >
            Correo
          </a>
          <a
            href="tel:+573118572322"
            className="px-3 py-1.5 bg-disnal-black/[0.04] text-disnal-black hover:bg-disnal-black/[0.08] border border-disnal-line/60 rounded transition-colors flex items-center gap-1"
          >
            Teléfono
          </a>
        </div>
      </div>
    </article>
  </section>
);
