import { useState } from 'react';
import './FaqItem.css';

export const FaqItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <article className="faq-item">
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <span>{question}</span>
        <strong>{open ? '−' : '+'}</strong>
      </button>
      {open && <p>{answer}</p>}
    </article>
  );
}; //agregar más productos
