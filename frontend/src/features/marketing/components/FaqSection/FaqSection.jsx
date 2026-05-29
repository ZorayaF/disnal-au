import { FaqItem } from "@components/shared/FaqItem";
import "./FaqSection.css";

const faqs = [
  {
    question: "¿Cómo solicito una cotización?",
    answer:
      "Agrega productos al carrito, revisa tu lista y completa los datos de empresa. Un asesor recibirá tu solicitud por WhatsApp.",
  },
  {
    question: "¿Cuánto tiempo tardan en responder?",
    answer:
      "Normalmente un asesor comercial responde en el menor tiempo posible durante el horario de atención.",
  },
  {
    question: "¿Hacen envíos a todo el país?",
    answer:
      "La cobertura se confirma según ciudad, producto y cantidad solicitada.",
  },
];

export const FaqSection = () => (
  <section className="faq-section" aria-labelledby="faq-section-title">
    <p>Soporte</p>
    <h2 id="faq-section-title">Preguntas frecuentes</h2>
    <span>Todo lo que debes saber antes de realizar tu pedido</span>
    <div className="faq-section__list">
      {faqs.map((faq) => (
        <FaqItem key={faq.question} {...faq} />
      ))}
    </div>
  </section>
);
