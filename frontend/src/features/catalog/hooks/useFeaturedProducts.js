// src/features/catalog/hooks/useFeaturedProducts.js
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@config/api";

export const useFeaturedProducts = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtener = async () => {
      try {
        setCargando(true);
        const respuesta = await fetch(`${API_BASE_URL}/productos`);
        if (!respuesta.ok) throw new Error("No se pudo conectar con el servidor.");

        const datos = await respuesta.json();
        const lista = datos.productos || datos;

        // Filtra solo los marcados como destacado y toma máximo 5
        const destacados = lista
          .filter((p) => p.destacado === true || p.destacado === "true")
          .slice(0, 5);

        setProductos(destacados);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    obtener();
  }, []);

  return { productos, cargando, error };
};