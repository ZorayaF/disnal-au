// src/hooks/useAdmin.js
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "@config/api";
import { crearEstructuraProducto } from "@models/Product"; // Importamos el modelo
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "@services/productService";

export const useAdmin = () => {
  const { logoutGlobal } = useContext(AuthContext);
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [productoEnEdicion, setProductoEnEdicion] = useState(null);

  const cargarInventario = () => {
    obtenerProductos()
      .then((data) => {
        setProductos(data.productos || data);
      })
      .catch((err) =>
        console.error("Error al cargar el inventario comercial:", err),
      );
  };

  useEffect(() => {
    cargarInventario();
  }, []);

  const manejarCerrarSesion = () => {
    logoutGlobal();
    navigate("/login");
  };

  const gestionarGuardar = async (datosFormulario) => {
    try {
      const urlsFinales = [];
      const archivosLocales = [];

      datosFormulario.imagenes.forEach((img) => {
        if (img instanceof File) {
          archivosLocales.push(img);
        } else {
          urlsFinales.push(img);
        }
      });

      if (archivosLocales.length > 0) {
        const formData = new FormData();
        archivosLocales.forEach((file) => {
          formData.append("imagenes", file);
        });

        const respuestaImagenes = await fetch(
          `${API_BASE_URL}/productos/upload-images`,
          {
            method: "POST",
            body: formData,
          },
        );

        const resultadoImagenes = await respuestaImagenes.json();

        if (!respuestaImagenes.ok) {
          throw new Error(
            resultadoImagenes.error ||
              "Fallo en la carga masiva de imágenes al servidor.",
          );
        }

        urlsFinales.push(...resultadoImagenes.imagenes);
      }

      // Estructuramos y limpiamos el producto final usando el modelo centralizado
      const productoListoParaGuardar = crearEstructuraProducto({
        ...datosFormulario,
        imagenes: urlsFinales,
      });

      if (productoEnEdicion) {
        await actualizarProducto(
          productoEnEdicion.id,
          productoListoParaGuardar,
        );
        setProductoEnEdicion(null);
      } else {
        await crearProducto(productoListoParaGuardar);
      }

      cargarInventario();
    } catch (error) {
      alert(error.message);
    }
  };

  const gestionarEliminar = (id) => {
    if (
      confirm("¿Seguro que deseas eliminar este insumo de la base de datos?")
    ) {
      eliminarProducto(id)
        .then(() => cargarInventario())
        .catch((err) => alert(err.message));
    }
  };

  const cancelarEdicion = () => setProductoEnEdicion(null);
  const seleccionarParaEditar = (prod) => setProductoEnEdicion(prod);

  return {
    productos,
    productoEnEdicion,
    manejarCerrarSesion,
    gestionarGuardar,
    gestionarEliminar,
    cancelarEdicion,
    seleccionarParaEditar,
  };
};
