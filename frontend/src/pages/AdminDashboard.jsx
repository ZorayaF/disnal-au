// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../services/productService";
import { AdminOverview } from "../components/sections/AdminOverview";
import { AdminManager } from "../components/sections/AdminManager";
import { Title } from "@components/ui/Title";

export const AdminDashboard = () => {
  const [productos, setProductos] = useState([]);
  const [productoEnEdicion, setProductoEnEdicion] = useState(null);

  // Cargar datos reales del servidor al montar la pantalla
  const cargarInventario = () => {
    obtenerProductos()
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al cargar:", err));
  };

  useEffect(() => {
    cargarInventario();
  }, []);

  // Función unificada para Crear o Editar
  const gestionarGuardar = async (datosFormulario) => {
    try {
      const urlsFinales = [];
      const archivosLocales = [];

      // 1. Separar lo que ya es una URL web de lo que es un archivo local binario
      datosFormulario.imagenes.forEach((img) => {
        if (img instanceof File) {
          archivosLocales.push(img);
        } else {
          urlsFinales.push(img); // Es una URL de internet o una imagen que ya estaba subida antes
        }
      });

      // 2. Si el administrador subió archivos binarios, los mandamos primero al servidor en lote
      if (archivosLocales.length > 0) {
        const formData = new FormData();
        archivosLocales.forEach((file) => {
          formData.append("imagenes", file); // 'imagenes' debe coincidir con upload.array('imagenes') del backend
        });

        const respuestaImagenes = await fetch(
          "http://localhost:4000/api/productos/upload-images",
          {
            method: "POST",
            body: formData, // FormData configura automáticamente las cabeceras multipart/form-data
          },
        );

        const resultadoImagenes = await respuestaImagenes.json();

        if (!respuestaImagenes.ok) {
          throw new Error(
            resultadoImagenes.error ||
              "Fallo en la carga de imágenes al servidor.",
          );
        }

        // Sumamos las URLs devueltas por Node.js al arreglo final
        urlsFinales.push(...resultadoImagenes.imagenes);
      }

      // 3. Estructuramos el payload limpio final que va a la base de datos JSON
      const productoListoParaGuardar = {
        ...datosFormulario,
        imagenes: urlsFinales, // Ya son puros strings de URLs de internet y de tu servidor local
      };

      // 4. Guardar o actualizar de forma regular mediante tus servicios tradicionales
      if (productoEnEdicion) {
        await actualizarProducto(
          productoEnEdicion.id,
          productoListoParaGuardar,
        );
        setProductoEnEdicion(null);
      } else {
        await crearProducto(productoListoParaGuardar);
      }

      // Recargar la tabla limpia en tiempo real
      cargarInventario();
    } catch (error) {
      alert(error.message);
    }
  };

  const gestionarEliminar = (id) => {
    if (confirm("¿Seguro que deseas eliminar este insumo?")) {
      eliminarProducto(id)
        .then(() => cargarInventario())
        .catch((err) => alert(err.message));
    }
  };

  return (
    <div className="min-h-screen bg-bg-main p-6 md:p-10 font-sans space-y-10">
      <div className="border-b border-border-component pb-4">
        <Title text="Panel de Administración General" level={1} />
        <p className="text-text-muted text-sm">
          Control de stock, ingresos y galerías de insumos.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        {/* Sección de Control / Formulario (AdminManager) */}
        <div className="xl:col-span-1">
          <AdminManager
            productoAEditar={productoEnEdicion}
            onGuardar={gestionarGuardar}
            onCancelar={() => setProductoEnEdicion(null)}
          />
        </div>

        {/* Sección de Visualización de Datos (AdminOverview) */}
        <div className="xl:col-span-2">
          <AdminOverview
            productos={productos}
            onEditar={(prod) => setProductoEnEdicion(prod)}
            onEliminar={gestionarEliminar}
          />
        </div>
      </div>
    </div>
  );
};
