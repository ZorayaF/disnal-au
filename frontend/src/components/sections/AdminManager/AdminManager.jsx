// src/components/sections/AdminManager.jsx
import { useAdminForm } from "@hooks/useAdminForm";
import { ImageManager } from "@sections/ImageManager";

export const AdminManager = ({ productoAEditar, onGuardar, onCancelar }) => {
  const { formValues, setFormValues, handleInputChange, enviarFormulario } =
    useAdminForm(productoAEditar, onGuardar);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        background: "#fff",
        maxWidth: "500px",
      }}
    >
      <h3>{productoAEditar ? "Modificar Insumo" : "Añadir Nuevo Insumo"}</h3>
      <hr />

      <form
        onSubmit={enviarFormulario}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <div>
          <label style={{ display: "block", marginBottom: "4px" }}>
            Nombre del Producto *
          </label>
          <input
            type="text"
            name="nombre"
            value={formValues.nombre}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "6px" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "4px" }}>
            Descripción Comercial
          </label>
          <textarea
            name="descripcion"
            value={formValues.descripcion}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "6px", minHeight: "50px" }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Especificaciones Técnicas (Atributo / Valor)
          </label>

          {/* 1. RENDERIZAR LAS FILAS QUE YA EXISTEN EN EL OBJETO */}
          {formValues.detallesTecnicos &&
          typeof formValues.detallesTecnicos === "object"
            ? Object.entries(formValues.detallesTecnicos).map(
                ([llave, valor], index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginBottom: "8px",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Ej: Cacao"
                      value={llave}
                      disabled={
                        true
                      } /* Mantiene la llave fija al editar, o puedes remover disabled si quieres renombrarla */
                      style={{ padding: "6px", flex: "1" }}
                    />
                    <input
                      type="text"
                      placeholder="Ej: 55%"
                      value={valor || ""}
                      onChange={(e) => {
                        // Actualiza dinámicamente el valor de esa llave específica
                        const copiaDetalles = {
                          ...formValues.detallesTecnicos,
                          [llave]: e.target.value,
                        };
                        setFormValues({
                          ...formValues,
                          detallesTecnicos: copiaDetalles,
                        });
                      }}
                      style={{ padding: "6px", flex: "1" }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        // Elimina el atributo del objeto si el usuario ya no lo quiere
                        const copiaDetalles = {
                          ...formValues.detallesTecnicos,
                        };
                        delete copiaDetalles[llave];
                        setFormValues({
                          ...formValues,
                          detallesTecnicos: copiaDetalles,
                        });
                      }}
                      style={{
                        padding: "6px 12px",
                        background: "#fee2e2",
                        color: "#b91c1c",
                        border: "1px solid #fca5a5",
                        cursor: "pointer",
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                ),
              )
            : null}

          {/* 2. BOTÓN DE (+) PARA AÑADIR NUEVOS ATRIBUTOS DINÁMICAMENTE */}
          <button
            type="button"
            onClick={() => {
              const nuevaLlave = prompt(
                "Escribe el nombre del atributo técnico (ej: Origen, Humedad, Proteína):",
              );
              if (!nuevaLlave) return;

              // Aseguramos que detallesTecnicos sea un objeto antes de esparcirlo
              const estructuraActual =
                typeof formValues.detallesTecnicos === "object" &&
                formValues.detallesTecnicos !== null
                  ? formValues.detallesTecnicos
                  : {};

              setFormValues({
                ...formValues,
                detallesTecnicos: {
                  ...estructuraActual,
                  [nuevaLlave]: "", // Lo inicializamos vacío listo para que el usuario escriba el valor
                },
              });
            }}
            style={{
              marginTop: "5px",
              padding: "6px 12px",
              background: "#f3f4f6",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            + Añadir Especificación Técnica
          </button>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "4px" }}>
            Cantidad en Stock *
          </label>
          <input
            type="number"
            name="cantidad"
            value={formValues.cantidad}
            onChange={handleInputChange}
            disabled={formValues.estado === "no disponible"}
            style={{ width: "100%", padding: "6px" }}
          />
        </div>

        <select
          name="categoria"
          value={
            // Evaluamos directamente contra los strings reales y limpios de la base de datos
            [
              "Harinas",
              "Azúcares y Endulzantes",
              "Grasas y Mantecas",
              "Levaduras y Leudantes",
              "Esencias y Sabores",
              "",
            ].includes(formValues.categoria)
              ? formValues.categoria
              : "otra"
          }
          onChange={(e) => {
            const valorSeleccionado = e.target.value;
            if (valorSeleccionado === "otra") {
              const nuevaCat = prompt(
                "Escribe el nombre de la nueva categoría (Ej: Chocolates y Coberturas):",
              );
              if (nuevaCat) {
                // Guardamos el texto exactamente como lo escribió el usuario
                setFormValues({ ...formValues, categoria: nuevaCat.trim() });
              }
            } else {
              handleInputChange(e);
            }
          }}
          style={{ width: "100%", padding: "6px" }}
        >
          <option value="">-- Seleccionar Categoría --</option>
          <option value="Harinas">Harinas</option>
          <option value="Azúcares y Endulzantes">Azúcares y Endulzantes</option>
          <option value="Grasas y Mantecas">Grasas y Mantecas</option>
          <option value="Levaduras y Leudantes">Levaduras y Leudantes</option>
          <option value="Esencias y Sabores">Esencias y Sabores</option>

          <option value="otra" style={{ fontWeight: "bold", color: "blue" }}>
            ➕ Añadir nueva categoría...
          </option>
        </select>

        {/* Validador de respaldo limpio */}
        {![
          "Harinas",
          "Azúcares y Endulzantes",
          "Grasas y Mantecas",
          "Levaduras y Leudantes",
          "Esencias y Sabores",
          "",
        ].includes(formValues.categoria) && (
          <p
            style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#2563eb" }}
          >
            Categoría personalizada activa:{" "}
            <strong>{formValues.categoria}</strong>
          </p>
        )}

        <div>
          <label style={{ display: "block", marginBottom: "4px" }}>
            Marca *
          </label>
          <input
            type="text"
            name="marca"
            value={formValues.marca}
            onChange={handleInputChange}
            placeholder="Ej: Haz de Oros"
            style={{ width: "100%", padding: "6px" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "4px" }}>
            Presentación de Fábrica *
          </label>
          <input
            type="text"
            name="presentacion"
            value={formValues.presentacion}
            onChange={handleInputChange}
            placeholder="Ej: Bulto de 50 kg, Bloque de 1 kg, Caja x 12 und"
            style={{ width: "100%", padding: "6px" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "4px" }}>
            Visibilidad / Estado
          </label>
          <select
            name="estado"
            value={formValues.estado}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "6px" }}
          >
            <option value="disponible">Disponible (Visible)</option>
            <option value="no disponible">No Disponible (Oculto)</option>
          </select>
        </div>

        <div>
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              name="destacado"
              checked={formValues.destacado}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  _destacado: e.target.checked,
                }))
              }
            />
            Marcar como Producto Destacado en Inicio
          </label>
        </div>

        <div
          style={{
            margin: "10px 0",
            border: "1px dashed #aaa",
            padding: "10px",
          }}
        >
          <ImageManager
            imagenes={formValues.imagenes}
            setImagenes={(nuevasImagenes) => {
              if (typeof nuevasImagenes === "function") {
                setFormValues((prev) => ({
                  ...prev,
                  imagenes: nuevasImagenes(prev.imagenes),
                }));
              } else {
                setFormValues((prev) => ({
                  ...prev,
                  imagenes: nuevasImagenes,
                }));
              }
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button type="submit" style={{ padding: "8px 16px", width: "100%" }}>
            {productoAEditar ? "Guardar Cambios" : "Registrar Insumo"}
          </button>
          <button
            type="button"
            onClick={onCancelar}
            style={{ padding: "8px 16px" }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
