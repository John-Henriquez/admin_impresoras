"use strict";
import Insumo from '../models/insumo.model';

// Create
export const createInsumo = async (req, res) => {
    try {
        const newInsumo = new Insumo(req.body);
        await newInsumo.save();
        res.status(201).json(newInsumo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Read
export const getInsumos = async (req, res) => {
    try {
        const insumos = await Insumo.find();
        res.status(200).json(insumos);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update
export const updateInsumo = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedInsumo = await Insumo.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedInsumo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete
export const deleteInsumo = async (req, res) => {
    try {
        const { id } = req.params;
        await Insumo.findByIdAndDelete(id);
        res.status(200).json({ message: 'Insumo eliminado' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
