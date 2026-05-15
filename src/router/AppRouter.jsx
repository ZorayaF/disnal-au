// src/router/AppRouter.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "@pages/Home";
import { Catalog } from "@pages/Catalog";
import { ProductView } from "@pages/ProductView";
import { Cart } from "@pages/Cart";
import { Consulting } from "@pages/Consulting";
import { Legal } from "@pages/Legal";
import { AdminDashboard } from "@pages/AdminDashboard";
import { TemporaryNavbar } from "@components/TemporaryNavbar";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      {/* La barra se renderiza en todas las pantallas */}
      <TemporaryNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductView />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/consulting" element={<Consulting />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
