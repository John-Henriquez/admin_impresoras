import Print from '../models/print.model.js';

// controlador para obtener una impresion
export async function getPrint(req, res) {
    try {
        // buscar por userRut o id de impresion
        const userRut = req.query.userRut;
        const idPrint = req.query.id;

        // si no se proporciona userRut o id, enviar un error
        if (!userRut && !idPrint) {
            res.status(400).json({
                message: "el parametro 'userRut' o 'id' es requerido.",
                data: null
            });
            return;
        }

        let print;
        // buscar por userRut
        if (userRut) {
            print = await Print.find({ userRut: userRut });
        } else {
            // buscar por id de impresion
            print = await Print.find({ id: idPrint });
        }

        // si no se encuentra la impresion, enviar un error
        if (print.length === 0) {
            res.status(404).json({
                message: "impresion no encontrada.",
                data: null
            });
            return;
        }

        // enviar la impresion encontrada
        res.status(200).json({
            message: "impresion encontrada.",
            data: print
        });
    } catch (error) {
        console.log("error en print.controller.js -> getPrint(): ", error);
        res.status(500).json({ message: error.message });
    }
}

// controlador para obtener todas las impresiones
export async function getPrints(req, res) {
    try {
        // buscar todas las impresiones
        const prints = await Print.find();
        if (prints.length === 0) {
            res.status(404).json({
                message: "no se encontraron impresiones"
            });
        } else {
            res.status(200).json({
                message: "lista de impresiones",
                data: prints
            });
        }
    } catch (error) {
        console.log("error en print.controller.js -> getPrints(): ", error);
        res.status(500).json({ message: error.message });
    }
}

// controlador para crear una nueva impresion
export async function createPrint(req, res) {
    try {
        // verificar primero si la id de impresion ya existe
        const printExist = await Print.findOne({ id: req.body.id });

        if (printExist) {
            res.status(400).json({
                message: "la 'id' de impresion ya existe, debe ser unica por impresion.",
                data: null
            });
            return;
        }

        // crear nueva impresion y guardar en la base de datos
        const newPrint = new Print(req.body);
        const print = await newPrint.save();
        res.status(201).json({
            message: "impresion creada.",
            data: print
        });
    } catch (error) {
        console.log("error en print.controller.js -> createPrint(): ", error);
        res.status(500).json({ message: error.message });
    }
}

// controlador para actualizar una impresion
export async function updatePrint(req, res) {
    try {
        // buscar por id de impresion
        const idPrint = req.query.id;
        // datos actualizados
        const updatedData = req.body;

        // si no se proporciona id, enviar un error
        if (!idPrint) {
            res.status(400).json({
                message: "el parametro 'id' es requerido.",
                data: null
            });
            return;
        }

        const print = await Print.findOneAndUpdate({ id: idPrint }, updatedData, { new: true });

        // si no se encuentra la impresion, enviar un error
        if (!print) {
            res.status(404).json({
                message: "impresion no encontrada.",
                data: null
            });
            return;
        }

        // enviar la impresion actualizada
        res.status(200).json({
            message: "impresion actualizada.",
            data: print
        });
    } catch (error) {
        console.log("error en print.controller.js -> updatePrint(): ", error);
        res.status(500).json({ message: error.message });
    }
}

// controlador para eliminar una impresion
export async function deletePrint(req, res) {
    try {
        const idPrint = req.query.id;
        // si no se proporciona id, enviar un error
        if (!idPrint) {
            res.status(400).json({
                message: "el parametro 'id' es requerido.",
                data: null
            });
            return;
        }

        const print = await Print.findOneAndDelete({ id: idPrint });

        // si no se encuentra la impresion, enviar un error
        if (!print) {
            res.status(404).json({
                message: "impresion no encontrada.",
                data: null
            });
            return;
        }

        // enviar mensaje de eliminacion exitosa
        res.status(200).json({
            message: "impresion eliminada.",
            data: print
        });
    } catch (error) {
        console.log("error en print.controller.js -> deletePrint(): ", error);
        res.status(500).json({ message: error.message });
    }
}
