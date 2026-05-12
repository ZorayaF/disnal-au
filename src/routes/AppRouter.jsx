import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import Catalog from "@pages/Catalog";
import ProductView from "@pages/ProductView";
import AboutUs from "@pages/AboutUs";
import Contact from "@pages/Contact";
import Faq from "@pages/Faq";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Catalog />} />
        <Route path="/producto/:id" element={<ProductView />} />
        <Route path="/nosotros" element={<AboutUs />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/preguntas-frecuentes" element={<Faq />} />
      </Routes>
    </BrowserRouter>
  );
}
