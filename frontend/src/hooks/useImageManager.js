// src/hooks/useImageManager.js
import { useState } from "react";

export const useImageManager = (imagenes, setImagenes) => {
  const [urlInput, setUrlInput] = useState("");

  const agregarUrl = (e) => {
    e.preventDefault();
    if (!urlInput.trim() || imagenes.length >= 5) return;
    setImagenes([...imagenes, urlInput.trim()]);
    setUrlInput("");
  };

  const procesarArchivos = (files) => {
    const espacioDisponible = 5 - imagenes.length;
    const archivosAProcesar = Array.from(files).slice(0, espacioDisponible);

    archivosAProcesar.forEach((file) => {
      if (!file.type.startsWith("image/")) return;

      // Adjuntar propiedad de previsualización temporal local
      file.previewUrl = URL.createObjectURL(file);
      setImagenes((prev) => [...prev, file]);
    });
  };

  const eliminarImagen = (index) => {
    const nuevaGaleria = imagenes.filter((_, i) => i !== index);
    setImagenes(nuevaGaleria);
  };

  return {
    urlInput,
    setUrlInput,
    agregarUrl,
    procesarArchivos,
    eliminarImagen,
  };
};
