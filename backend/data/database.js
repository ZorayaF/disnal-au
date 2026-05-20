// backend/data/database.js
import fs from "fs";

const DB_PATH = "./data/database.json";

export const inicializarDB = () => {
  if (!fs.existsSync(DB_PATH)) {
    const initialData = {
      usuarios: [
        {
          usuario: "admin",
          contrasena: "pasteleria2026",
        },
      ],
      productos: [
        {
          id: 1,
          nombre: "Harina de Trigo Especial Hojaldre (25kg)",
          estado: "disponible",
          cantidad: 50,
        },
        {
          id: 2,
          nombre: "Chocolate de Cobertura Semiamargo 55% (1kg)",
          estado: "disponible",
          cantidad: 120,
        },
        {
          id: 3,
          nombre: "Mantequilla Sin Sal Bloque (5kg)",
          estado: "disponible",
          cantidad: 30,
        },
      ],
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), "utf8");
  }
};

export const leerDB = () => {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
};

export const escribirDB = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf8");
};
