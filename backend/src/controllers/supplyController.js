"use strict";
import Supply from "../models/Supply.js";

export async function getSupply(req, res) {
    try {
        const idSupply = req.query._idid;

        if (!idSupply) {
            res.status(400).json({
                message: "El parámetro 'id' es requerido.",
                data: null
            });
            return;
        }

        const supply = await Supply.findOne({ _id: idSupply });

        if (!supply) {
            res.status(404).json({
                message: "Insumo no encontrado.",
                data: null
            });
            return;
        }

        res.status(200).json({
            message: "Insumo encontrado.",
            data: supply
        });
    } catch (error) {
        console.log("Error en supply.controller.js -> getSupply(): ", error);
        res.status(500).json({ message: error.message });
    }
}

export async function getSupplies(req, res) {
    try {
        const supplies = await Supply.find();

        if (supplies.length === 0) {
            res.status(404).json({
                message: "No se encontraron insumos",
                data: null
            });
            return;
        }

        res.status(200).json({
            message: "Lista de insumos",
            data: supplies
        });
    } catch (error) {
        console.log("Error en supply.controller.js -> getSupplies(): ", error);
        res.status(500).json({ message: error.message });
    }
}


export async function updateSupply(req, res) {
    const idSupply = req.params._id; // Accedemos al parámetro dinámico _id desde la URL
    const updatedData = req.body; // Datos actualizados que vienen en el cuerpo de la solicitud

    try {
        const supplyMod = await Supply.findOneAndUpdate({ _id: idSupply }, updatedData, { new: true });

        if (!supplyMod) {
            return res.status(404).json({
                message: "Insumo no encontrado.",
                data: null
            });
        }

        res.status(200).json({
            message: "Insumo actualizado correctamente.",
            data: supplyMod
        });

    } catch (error) {
        console.log("Error en updateSupply:", error);
        res.status(500).json({ message: error.message });
    }
}

export async function deleteSupply(req, res) {
    try {
        const idSupply = req.params._id;

        if (!idSupply) {
            return res.status(400).json({
                message: "El parámetro '_id' es requerido.",
                data: null
            });
        }

        const supply = await Supply.findOneAndDelete({ _id: idSupply });

        if (!supply) {
            return res.status(404).json({
                message: "Insumo no encontrado.",
                data: null
            });
        }

        res.status(200).json({
            message: "Insumo eliminado exitosamente.",
            data: supply
        });

    } catch (error) {
        console.error("Error en deleteSupply:", error);
        res.status(500).json({ message: error.message });
    }
}


export async function createSupply(req, res) {
    try {
        const supplyData = req.body;

        const newSupply = new Supply(supplyData);
        await newSupply.save();

        res.status(201).json({
            message: "Insumo creado correctamente.",
            data: newSupply
        });

    } catch (error) {
        console.log("Error en supply.controller.js -> createSupply(): ", error);
        res.status(500).json({ message: error.message });
    }
}
