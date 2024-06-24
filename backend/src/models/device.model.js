// Importa el modulo 'mongoose' para crear la conexion a la base de datos
import { Schema, model } from "mongoose";
import IMP_ESTADOS from "../constants/device.constants.js";

// Crea el esquema de la coleccion 'devices'
const deviceSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    serialnumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: IMP_ESTADOS,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

// Crea el modelo de datos 'Device' a partir del esquema 'deviceSchema'
const Device = model("Device", deviceSchema);

export default Device;
