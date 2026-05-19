// src/pages/AdminDashboard.jsx

import { useEffect } from "react";
import { AdminOverview } from "@sections/AdminOverview";
import { AdminManager } from "@sections/AdminManager";

export const AdminDashboard = () => {
  useEffect(() => {
    document.title = "Disnal AU - Admin Dashboard";
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "25px",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "#0f172a", margin: 0, fontSize: "24px" }}>
        Admin Dashboard
      </h1>

      {/* Resumen de métricas y alertas críticas */}
      <AdminOverview />

      {/* Panel de gestión y tabla CRUD de productos */}
      <AdminManager />
    </div>
  );
};
