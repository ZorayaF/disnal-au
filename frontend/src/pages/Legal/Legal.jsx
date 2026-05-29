// src/pages/Legal.jsx
import { useEffect } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { LegalDirectory } from "@/features/legal/components/LegalDirectory";

export const Legal = () => {
  useEffect(() => {
    document.title = "Disnal AU - Legal Information";
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "20px",
      }}
    >
      {/* Banner superior REUTILIZADO */}
      <PageHeader />

      {/* Directorio con las tarjetas/enlaces a cada política legal */}
      <LegalDirectory />
    </div>
  );
};
