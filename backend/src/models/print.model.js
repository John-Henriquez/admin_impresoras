"use strict";
// importa el modulo 'mongoose' para crear la conexion a la base de datos
import { Schema, model } from "mongoose";

// define el esquema de una impresion
const printSchema = new Schema(
    {
        id: {
            type: Number,
            required: true,
        },
        userRut: {
            type: String,
            required: true,
        },
        documentName: {
            type: String,
            required: true,
        },
        pages: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['pendiente', 'completado', 'cancelado'],
            default: 'pendiente',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        versionKey: false, // no se muestra el campo "__v" en la respuesta de la api
    },
);

// crea el modelo de impresion basado en el esquema definido
const Print = model("Print", printSchema);

export default Print;
