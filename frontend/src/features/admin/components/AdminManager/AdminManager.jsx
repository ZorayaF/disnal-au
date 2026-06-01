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

  // Control local para alternar entre selección o creación de categorías libre
  const [crearNuevaCategoria, setCrearNuevaCategoria] = useState(false);

  // Efecto preventivo: Activa el modo de creación libre si el insumo trae una categoría personalizada
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

  // Callback puente para inyectar de forma segura el arreglo completo de imágenes en el hook del formulario
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
      className="w-full max-w-4xl mx-auto bg-white p-6 rounded-2xl border border-neutral-200 shadow-lg text-neutral-900 font-sans"
      aria-labelledby="admin-manager-title"
    >
      {/* Encabezado del Formulario */}
      <header className="flex items-center gap-2 border-b border-neutral-100 pb-4 mb-6">
        <span
          className="text-red-600 font-black text-xl leading-none"
          aria-hidden="true"
        >
          ＋
        </span>
        <h2
          id="admin-manager-title"
          className="text-base font-black uppercase tracking-wider text-neutral-800"
        >
          {productoAEditar
            ? "Modificar insumo comercial"
            : "Añadir nuevo insumo al catálogo"}
        </h2>
      </header>

      <form className="space-y-6" onSubmit={enviarFormulario} noValidate>
        {/* Grid de Inputs Core */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Nombre del producto"
            name="nombre"
            value={formValues.nombre}
            onChange={handleInputChange}
            placeholder="Ej: Harina de Trigo Especial"
            disabled={guardando}
            required
            theme="light"
          />

          {/* Gestor Dinámico de Categorías */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Categoría
              </span>
              <button
                type="button"
                onClick={() => {
                  setCrearNuevaCategoria(!crearNuevaCategoria);
                  setCustomValue("categoria", ""); // Limpieza preventiva para evitar colisiones de estado
                }}
                className="text-[11px] text-red-600 font-black uppercase tracking-wider hover:underline cursor-pointer"
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
                <option value="">Seleccionar categoría</option>
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
            label="Cantidad inicial en stock"
            name="cantidad"
            value={formValues.cantidad}
            onChange={handleInputChange}
            disabled={guardando || formValues.estado === "no disponible"}
            placeholder="0"
            required
            theme="light"
          />

          <InputField
            as="select"
            label="Disponibilidad comercial"
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
            label="Marca del fabricante"
            name="marca"
            value={formValues.marca}
            onChange={handleInputChange}
            placeholder="Ej: Haz de Oros"
            disabled={guardando}
            theme="light"
          />

          <InputField
            label="Presentación de despacho"
            name="presentacion"
            value={formValues.presentacion}
            onChange={handleInputChange}
            placeholder="Ej: Bulto 25kg / Caja 12 unds"
            disabled={guardando}
            theme="light"
          />

          {/* Ficha Técnica Elástica (Atributos Clave-Valor Dinámicos) */}
          <div className="md:col-span-2 border-t border-dashed border-neutral-200 pt-5 mt-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-neutral-800">
                Ficha Técnica Personalizada
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  agregarAtributoDinamico(`Atributo-${Date.now()}`, "")
                }
                className="!text-red-600 border-red-200 hover:bg-red-50 text-[11px] font-black uppercase shadow-2xs cursor-pointer"
              >
                ＋ Añadir Atributo
              </Button>
            </div>

            <div className="flex flex-col gap-3">
              {Object.entries(formValues.detallesTecnicos || {}).map(
                ([clave, valor], index) => {
                  // Si es una propiedad recién creada, limpiamos el marcador visual para que aparezca en blanco para el administrador
                  const claveLimpia = clave.startsWith("Atributo-")
                    ? ""
                    : clave;

                  return (
                    <div
                      key={`${productoAEditar?.id || "nuevo"}-spec-${index}`}
                      className="flex items-center gap-3 bg-neutral-50/50 p-3 border border-neutral-100 rounded-xl shadow-xs"
                    >
                      <div className="flex-1">
                        <InputField
                          placeholder="Propiedad (Ej: Proteína, Humedad)"
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
                          placeholder="Valor asignado (Ej: 12.5%, 14% Máx)"
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
                        className="!text-red-600 border-neutral-200 hover:bg-red-50 h-11 px-4 cursor-pointer rounded-xl"
                      >
                        ✕
                      </Button>
                    </div>
                  );
                },
              )}

              {Object.keys(formValues.detallesTecnicos || {}).length === 0 && (
                <p className="text-xs text-neutral-400 italic text-center py-4 bg-neutral-50/30 border border-dashed border-neutral-200 rounded-xl">
                  No se han registrado especificaciones extras para este lote
                  técnico.
                </p>
              )}
            </div>
          </div>

          <InputField
            as="textarea"
            label="Descripción técnica / comercial"
            name="descripcion"
            value={formValues.descripcion}
            onChange={handleInputChange}
            placeholder="Escribe las características principales del insumo para los clientes corporativos..."
            disabled={guardando}
            className="md:col-span-2"
            rows={3}
            theme="light"
          />

          {/* Checkbox de Producto Destacado */}
          <label className="md:col-span-2 flex items-center gap-3 p-4 bg-neutral-50 border border-neutral-100 rounded-xl cursor-pointer select-none hover:bg-neutral-100/70 transition-colors mt-2">
            <input
              type="checkbox"
              name="destacado"
              checked={Boolean(formValues.destacado)}
              onChange={handleInputChange}
              disabled={guardando}
              className="w-4 h-4 accent-red-600 cursor-pointer disabled:cursor-not-allowed"
            />
            <span className="text-xs font-black uppercase tracking-wider text-neutral-700">
              Marcar como producto destacado en el catálogo principal
            </span>
          </label>
        </div>

        {/* Sección del Gestor de Imágenes */}
        <div className="border-t border-neutral-100 pt-6">
          <ImageManager
            imagenes={formValues.imagenes}
            setImagenes={setImagenes}
          />
        </div>

        {/* Botonera de Acciones Finales */}
        <div className="flex justify-end gap-3 border-t border-neutral-100 pt-4 mt-6">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={cancelar}
            disabled={guardando}
            className="!text-neutral-500 border-neutral-200 hover:bg-neutral-50 cursor-pointer"
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={guardando}
            className="bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-600/10 cursor-pointer"
          >
            {guardando
              ? "Guardando insumo..."
              : productoAEditar
                ? "Guardar cambios"
                : "Registrar nuevo insumo"}
          </Button>
        </div>
      </form>
    </section>
  );
};
