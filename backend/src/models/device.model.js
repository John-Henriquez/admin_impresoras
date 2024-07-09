// Importa el modulo 'mongoose' para crear la conexion a la base de datos
import { Schema, model } from "mongoose";

// Crea el esquema de la coleccion 'devices'
const deviceSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["fotocopiadora", "impresora", "multifuncional"],
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    modelnumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["funcional", "defectuosa", "reparacion"],
      default: "funcional",
      required: true,
    },
  },
  {
    versionKey: false, // No se muestra el campo "__v" en la respuesta de la API
  },
);

// Crea el modelo de datos 'Device' a partir del esquema 'deviceSchema'
const Device = model("Device", deviceSchema);

export default Device;
