"use strict";

import  mongoose from 'mongoose';

const insumoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    cantidad: {
        type: Number,
        required: true,
    },
    estado: {
        type: String,
        required: true,
        enum: ['disponible', 'bajo', 'agotado'],
        default: 'disponible'
    },
    fechaMantenimiento: {
        type: Date,
    },
    alerta: {
        type: Boolean,
        default: false
    }
});

const Insumo = mongoose.model('Insumo', insumoSchema);

export default Insumo;
