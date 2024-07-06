"use strict";
import { Schema, model } from "mongoose";

const supplySchema = new Schema(
    {
        _id: {
        type: Number,
        required: true,
          },
        nombre: {
        type: String,
        required: true,
        },
        cantidad: {
        type: Number,
        required: true,
        },
    },
    {
        versionKey: false,
    },
);

export default model('Supply', supplySchema);
