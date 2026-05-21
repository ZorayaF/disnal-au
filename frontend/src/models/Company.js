// src/models/Company.js

// El molde maestro con todos los campos comerciales requeridos por Figma
export const DEFAULT_COMPANY_STATE = {
  nombreEmpresa: "",
  razonSocial: "",
  nitRuc: "",
  nombreContacto: "",
  correo: "",
  telefono: "",
  ciudad: "",
  necesidadesEspecificas: "",
};

// Función de fábrica para limpiar o asegurar la integridad del cliente corporativo
export const crearEstructuraEmpresa = (datos = {}) => {
  return {
    ...DEFAULT_COMPANY_STATE,
    ...datos,
  };
};
