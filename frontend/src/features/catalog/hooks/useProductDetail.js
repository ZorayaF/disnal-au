// src/hooks/useProductDetail.js
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerProductos } from "@services/productService";

export const useProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [productosRelacionados, setProductosRelacionados] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarInformacion = async () => {
      try {
        setCargando(true);
        const respuestaApi = await obtenerProductos();

        // Extraemos de forma segura el arreglo real de productos
        const todosLosProductos = respuestaApi.productos || respuestaApi;

        if (!Array.isArray(todosLosProductos)) {
          throw new Error("No se pudo obtener la lista de productos.");
        }

        // Evita que falle si un ID viene como número y el otro como texto
        const encontrado = todosLosProductos.find(
          (p) => String(p.id) === String(id),
        );

        if (encontrado) {
          setProducto(encontrado);

          // Algoritmo de recomendación estratégica/relacionada intacto
          const recomendados = todosLosProductos
            .filter((p) => String(p.id) !== String(encontrado.id))
            .sort((a, b) => {
              // Prioridad 1: Misma categoría
              const aMismaCat = a.categoria === encontrado.categoria ? 1 : 0;
              const bMismaCat = b.categoria === encontrado.categoria ? 1 : 0;
              if (aMismaCat !== bMismaCat) return bMismaCat - aMismaCat;

              // Prioridad 2: Destacados
              const aDestacado = a.destacado ? 1 : 0;
              const bDestacado = b.destacado ? 1 : 0;
              return bDestacado - aDestacado;
            })
            .slice(0, 4);

          setProductosRelacionados(recomendados);
        } else {
          // Si el producto realmente no existe, redirigimos limpiamente
          navigate("/catalog", { replace: true });
        }
      } catch (error) {
        console.error("Error cargando la vista de producto:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarInformacion();
  }, [id]);

  const volverAtras = () => navigate(-1);
  const irAlCatalogo = () => navigate("/catalog");

  return {
    producto,
    productosRelacionados,
    cargando,
    volverAtras,
    irAlCatalogo,
  };
};
