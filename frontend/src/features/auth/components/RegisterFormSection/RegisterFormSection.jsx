// src/sections/RegisterFormSection.jsx
import React from "react";
import { InputField } from "@components/ui/InputField/InputField";
import { Button } from "@components/ui/Button/Button";

export const RegisterFormSection = ({
  formulario,
  cargando,
  error,
  registroExitoso,
  onCambio,
  onEnviar,
}) => {
  if (registroExitoso) {
    return (
      <div className="bg-white p-8 rounded-xl border border-disnal-line shadow-disnal-deep text-center space-y-4 max-w-lg mx-auto font-sans text-disnal-ink">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center text-3xl mx-auto animate-bounce font-bold">
          ✓
        </div>
        <h3 className="text-xl font-black text-disnal-black uppercase tracking-tight">
          ¡Solicitud Recibida Correctamente!
        </h3>
        <p className="text-sm text-disnal-gray leading-relaxed font-medium">
          Los datos de su organización han sido guardados en nuestro registro
          central de auditoría. Un agente de{" "}
          <span className="font-black text-disnal-red">Disnal AU</span> evaluará
          sus datos comerciales para habilitar sus credenciales del portal
          corporativo dentro de las próximas 24 horas.
        </p>
        <div className="pt-2 border-t border-dashed border-disnal-line/60">
          <p className="text-xs text-disnal-gray font-medium">
            Se enviará una notificación a:{" "}
            <strong className="text-disnal-black font-black font-mono">
              {formulario.correo}
            </strong>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl border border-disnal-line shadow-sm max-w-2xl mx-auto font-sans text-disnal-ink">
      <div className="mb-6 border-b border-disnal-line/60 pb-4">
        <h2 className="text-xl font-black text-disnal-black uppercase tracking-tight">
          Formulario de Afiliación Comercial
        </h2>
        <p className="text-xs text-disnal-gray font-medium mt-1">
          Todos los campos marcados con (*) son obligatorios para verificación
          de crédito e inventario.
        </p>
      </div>

      {error && (
        <div
          className="mb-6 bg-disnal-red/5 border-l-4 border-disnal-red p-4 rounded text-disnal-red text-xs font-black uppercase tracking-wide"
          role="alert"
        >
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={onEnviar} className="space-y-5" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Company Name */}
          <InputField
            label="Razón Social"
            type="text"
            name="nombre_empresa"
            value={formulario.nombre_empresa || ""}
            onChange={onCambio}
            placeholder="Ej. Distribuidora Central S.A.S."
            disabled={cargando}
            required
            theme="light"
          />

          {/* Tax Code Registration identifier */}
          <InputField
            label="NIT / RUT (Con dígito verificación)"
            type="text"
            name="nit_ruc"
            value={formulario.nit_ruc || ""}
            onChange={onCambio}
            placeholder="Ej. 900123456-1"
            disabled={cargando}
            required
            theme="light"
            className="font-mono text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Corporate Email */}
          <InputField
            label="Correo Corporativo"
            type="email"
            name="correo"
            value={formulario.correo || ""}
            onChange={onCambio}
            placeholder="compras@tuempresa.com"
            disabled={cargando}
            required
            theme="light"
          />

          {/* Phone Number */}
          <InputField
            label="Teléfono de Contacto"
            type="tel"
            name="telefono"
            value={formulario.telefono || ""}
            onChange={onCambio}
            placeholder="Ej. +57 300 123 4567"
            disabled={cargando}
            required
            theme="light"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Contraseña Corporativa */}
          <InputField
            label="Contraseña del Portal"
            type="password"
            name="password"
            value={formulario.password || ""}
            onChange={onCambio}
            placeholder="Cree una clave segura"
            disabled={cargando}
            required
            theme="light"
          />

          {/* Copia Digital de NIT o RUC */}
          <div className="space-y-1">
            <span className="text-xs font-black text-disnal-black uppercase tracking-wider block">
              Copia Digital de NIT o RUC{" "}
              <span className="text-disnal-red" aria-hidden="true">
                *
              </span>
            </span>
            <div className="relative">
              <input
                type="file"
                name="nitFile"
                accept="image/*,application/pdf"
                onChange={onCambio}
                disabled={cargando}
                required
                className={`
                  w-full px-3 py-1.5 border border-black/20 rounded text-xs text-disnal-gray
                  bg-[#f8f8f8] file:mr-3 file:py-1 file:px-2.5 file:rounded-sm file:border-0 
                  file:text-[10px] file:font-black file:uppercase file:tracking-wider file:bg-disnal-black 
                  file:text-white file:cursor-pointer hover:file:bg-disnal-black-soft transition-all
                  disabled:opacity-60 disabled:cursor-not-allowed
                `
                  .trim()
                  .replace(/\s+/g, " ")}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Country Selection */}
          <InputField
            as="select"
            label="País"
            name="pais"
            value={formulario.pais || "Colombia"}
            onChange={onCambio}
            disabled={cargando}
            theme="light"
          >
            <option value="Colombia">Colombia</option>
            <option value="México">México</option>
            <option value="Chile">Chile</option>
            <option value="Perú">Perú</option>
          </InputField>

          {/* City */}
          <InputField
            label="Ciudad"
            type="text"
            name="ciudad"
            value={formulario.ciudad || ""}
            onChange={onCambio}
            placeholder="Ej. Bogotá"
            disabled={cargando}
            required
            theme="light"
          />

          {/* Commercial Sector Dropdown */}
          <InputField
            as="select"
            label="Sector Comercial"
            name="sectorComercial"
            value={formulario.sectorComercial || ""}
            onChange={onCambio}
            disabled={cargando}
            theme="light"
          >
            <option value="">Seleccione Sector</option>
            <option value="Retail">Retail / Detallista</option>
            <option value="Distribucion">Logística e Importaciones</option>
            <option value="Manufactura">Fábrica / Manufactura</option>
            <option value="Salud">Clínicas / Salud</option>
            <option value="Otro">Otro Sector</option>
          </InputField>
        </div>

        {/* Optional Comments */}
        <InputField
          as="textarea"
          label="Información adicional / Notas operativas"
          name="comentarios"
          value={formulario.comentarios || ""}
          onChange={onCambio}
          rows="3"
          placeholder="Especifique volúmenes estimados de compra, sucursales o requerimientos especiales de despacho..."
          disabled={cargando}
          theme="light"
        />

        {/* Form Submission Actions */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={cargando}
            className="w-full justify-center gap-2 shadow-none"
          >
            {cargando ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-b-transparent rounded-full animate-spin"></div>
                Procesando Alta Corporativa...
              </>
            ) : (
              "Enviar Solicitud de Registro"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
