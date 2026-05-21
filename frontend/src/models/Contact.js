// src/models/Contact.js

// El molde maestro con los campos exactos del formulario de asesoría
export const DEFAULT_CONTACT_STATE = {
  nombreCompleto: "",
  cargo: "",
  nombreEmpresa: "",
  correoEmpresarial: "",
  telefono: "",
  asunto: "",
  mensaje: "",
};

// Función de fábrica para estructurar la consulta limpia
export const crearEstructuraConsulta = (datos = {}) => {
  return {
    ...DEFAULT_CONTACT_STATE,
    ...datos,
  };
};
