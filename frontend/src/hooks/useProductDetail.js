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
        const todosLosProductos = await obtenerProductos();
        const encontrado = todosLosProductos.find((p) => p.id === Number(id));

        if (encontrado) {
          setProducto(encontrado);
          const relacionados = todosLosProductos
            .filter((p) => p.id !== encontrado.id)
            .slice(0, 4);
          setProductosRelacionados(relacionados);
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
