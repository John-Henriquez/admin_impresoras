// backend/src/controllers/print.controller.js
import Print from '../models/print.model.js';

export async function createPrint(req, res) {
    try {
        const print = new Print(req.body);
        await print.save();
        res.status(201).json(print);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function getPrints(req, res) {
    try {
        const prints = await Print.find().populate('userId', 'name email');
        res.status(200).json(prints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function updatePrint(req, res) {
    try {
        const { id } = req.params;
        const print = await Print.findByIdAndUpdate(id, req.body, { new: true });
        if (!print) return res.status(404).json({ message: 'Impresion no encontrada' });
        res.status(200).json(print);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function deletePrint(req, res) {
    try {
        const { id } = req.params;
        const print = await Print.findByIdAndDelete(id);
        if (!print) return res.status(404).json({ message: 'impresion no encontrada' });
        res.status(200).json({ message: 'impresion eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
