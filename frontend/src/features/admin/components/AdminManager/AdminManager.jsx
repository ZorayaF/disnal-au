// src/features/admin/components/AdminManager.jsx
import React, { useState, useEffect } from "react";
import { useAdminForm } from "@/features/admin/hooks/useAdminForm";
import { ImageManager } from "@/features/admin/components/ImageManager";
import { InputField } from "@components/ui/InputField/InputField";
import { Button } from "@components/ui/Button/Button";

const categoriasPredefinidas = [
  "Harinas",
  "Azúcares y Endulzantes",
  "Grasas y Mantecas",
  "Levaduras y Leudantes",
  "Esencias y Sabores",
  "Lácteos",
  "Otros",
];

export const AdminManager = ({ productoAEditar, onGuardar, onCancelar }) => {
  const {
    formValues,
    setFormValues,
    handleInputChange,
    setCustomValue,
    agregarAtributoDinamico,
    modificarAtributoDinamico,
    eliminarAtributoDinamico,
    enviarFormulario,
    guardando,
  } = useAdminForm(productoAEditar, onGuardar);

  // Control local para saber si mostramos un Input de texto o un Select de categorías
  const [crearNuevaCategoria, setCrearNuevaCategoria] = useState(false);

  // Efecto preventivo: Si editamos un insumo con categoría personalizada, activamos el input libre
  useEffect(() => {
    if (
      formValues.categoria &&
      !categoriasPredefinidas.includes(formValues.categoria)
    ) {
      setCrearNuevaCategoria(true);
    }
  }, [formValues.categoria]);

  const cancelar = () => {
    onCancelar?.();
  };

  const setImagenes = (nextImages) => {
    if (typeof nextImages === "function") {
      setFormValues((prev) => ({
        ...prev,
        imagenes: nextImages(prev.imagenes),
      }));
      return;
    }
    setFormValues((prev) => ({ ...prev, imagenes: nextImages }));
  };

  return (
    <section
      className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg border border-disnal-line shadow-sm text-disnal-ink font-sans"
      aria-labelledby="admin-manager-title"
    >
      <header className="flex items-center gap-2 border-b border-disnal-line pb-4 mb-6">
        <span className="text-disnal-red font-black text-xl" aria-hidden="true">
          ＋
        </span>
        <h2
          id="admin-manager-title"
          className="text-lg font-black uppercase tracking-disnal-nav text-disnal-black"
        >
          {productoAEditar ? "Modificar insumo" : "Añadir nuevo insumo"}
        </h2>
      </header>

      <form className="space-y-6" onSubmit={enviarFormulario} noValidate>
        {/* Input Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Nombre del producto"
            name="nombre"
            value={formValues.nombre}
            onChange={handleInputChange}
            placeholder="Ej: Harina"
            disabled={guardando}
            required
            theme="light"
          />

          {/* Gestor de Categorías Dinámico */}
          <div className="flex flex-col space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-disnal-gray">
                Categoría
              </span>
              <button
                type="button"
                onClick={() => {
                  setCrearNuevaCategoria(!crearNuevaCategoria);
                  setCustomValue("categoria", ""); // Reseteamos el campo al cambiar de interfaz
                }}
                className="text-[11px] text-disnal-red font-black uppercase tracking-wider hover:underline cursor-pointer"
              >
                {crearNuevaCategoria ? "Ver catálogo base" : "＋ Crear Nueva"}
              </button>
            </div>

            {crearNuevaCategoria ? (
              <InputField
                name="categoria"
                value={formValues.categoria}
                onChange={handleInputChange}
                placeholder="Escribe la nueva categoría..."
                disabled={guardando}
                theme="light"
              />
            ) : (
              <InputField
                as="select"
                name="categoria"
                value={formValues.categoria}
                onChange={handleInputChange}
                disabled={guardando}
                theme="light"
              >
                <option value="">Seleccionar</option>
                {categoriasPredefinidas.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </InputField>
            )}
          </div>

          <InputField
            type="number"
            min="0"
            label="Cantidad en stock"
            name="cantidad"
            value={formValues.cantidad}
            onChange={handleInputChange}
            disabled={guardando || formValues.estado === "no disponible"}
            placeholder="#"
            required
            theme="light"
          />

          <InputField
            as="select"
            label="Disponibilidad"
            name="estado"
            value={formValues.estado}
            onChange={handleInputChange}
            disabled={guardando}
            theme="light"
          >
            <option value="disponible">Disponible</option>
            <option value="no disponible">No disponible</option>
          </InputField>

          <InputField
            label="Marca"
            name="marca"
            value={formValues.marca}
            onChange={handleInputChange}
            placeholder="Ej: Haz de Oros"
            disabled={guardando}
            theme="light"
          />

          <InputField
            label="Presentación"
            name="presentacion"
            value={formValues.presentacion}
            onChange={handleInputChange}
            placeholder="Ej: 500g"
            disabled={guardando}
            theme="light"
          />

          {/* 🟢 SECCIÓN INTERACTIVA CLAVE-VALOR (Ficha Técnica Elástica) */}
          <div className="md:col-span-2 border-t border-dashed border-disnal-line/60 pt-4 mt-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-disnal-black">
                Ficha Técnica Personalizada
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  agregarAtributoDinamico(`Atributo-${Date.now()}`, "")
                }
                className="!text-disnal-red border-disnal-red hover:bg-disnal-red/5 text-[11px] font-black uppercase shadow-2xs"
              >
                ＋ Añadir Atributo
              </Button>
            </div>

            <div className="space-y-3">
              {Object.entries(formValues.detallesTecnicos || {}).map(
                ([clave, valor], index) => {
                  // Si el ID temporal autogenerado está presente, limpiamos el marcador visual para que esté en blanco
                  const claveLimpia = clave.startsWith("Atributo-")
                    ? ""
                    : clave;

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-disnal-black/[0.01] p-2 border border-disnal-line/40 rounded shadow-3xs"
                    >
                      <div className="flex-1">
                        <InputField
                          placeholder="Propiedad (Ej: Proteína, Humedad, Grasa)"
                          value={claveLimpia}
                          onChange={(e) =>
                            modificarAtributoDinamico(
                              clave,
                              e.target.value,
                              valor,
                            )
                          }
                          disabled={guardando}
                          theme="light"
                        />
                      </div>
                      <div className="flex-1">
                        <InputField
                          placeholder="Valor asignado (Ej: 40g, 13% Máx)"
                          value={valor}
                          onChange={(e) =>
                            modificarAtributoDinamico(
                              clave,
                              clave,
                              e.target.value,
                            )
                          }
                          disabled={guardando}
                          theme="light"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => eliminarAtributoDinamico(clave)}
                        disabled={guardando}
                        className="!text-disnal-red border-disnal-line hover:bg-disnal-red/5 h-10 px-3 cursor-pointer"
                      >
                        ✕
                      </Button>
                    </div>
                  );
                },
              )}

              {Object.keys(formValues.detallesTecnicos || {}).length === 0 && (
                <p className="text-xs text-disnal-gray italic text-center py-3 bg-disnal-black/[0.01] border border-dashed border-disnal-line rounded">
                  No se han registrado atributos técnicos extras para este
                  insumo.
                </p>
              )}
            </div>
          </div>

          <InputField
            as="textarea"
            label="Descripción comercial"
            name="descripcion"
            value={formValues.descripcion}
            onChange={handleInputChange}
            placeholder="Descripción breve del insumo..."
            disabled={guardando}
            className="md:col-span-2"
            rows={3}
            theme="light"
          />

          <label className="md:col-span-2 flex items-center gap-3 p-3 bg-disnal-black/[0.02] border border-disnal-line/60 rounded cursor-pointer select-none hover:bg-disnal-black/[0.04] transition-colors mt-2">
            <input
              type="checkbox"
              name="destacado"
              checked={Boolean(formValues.destacado)}
              onChange={handleInputChange}
              disabled={guardando}
              className="w-4 h-4 accent-disnal-red cursor-pointer disabled:cursor-not-allowed"
            />
            <span className="text-xs font-black uppercase tracking-wider text-disnal-black">
              Marcar como producto destacado en inicio
            </span>
          </label>
        </div>

        {/* Media Asset Component */}
        <div className="border-t border-disnal-line/60 pt-6">
          <ImageManager
            imagenes={formValues.imagenes}
            setImagenes={setImagenes}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 border-t border-disnal-line/60 pt-4 mt-6">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={cancelar}
            disabled={guardando}
            className="!text-disnal-gray border-disnal-line hover:bg-disnal-black/5"
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={guardando}
          >
            {guardando
              ? "Guardando..."
              : productoAEditar
                ? "Guardar cambios"
                : "Registrar insumo"}
          </Button>
        </div>
      </form>
    </section>
  );
};
