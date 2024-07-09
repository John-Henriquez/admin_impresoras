// Importa el modelo de datos 'Device'
import Device from '../models/device.model.js';

export async function getDevice(req, res) {
    try {
        // buscar por id de dispositivo o nombre
        const idDevice = req.query.id;
        const typeDevice = req.query.type;

        if (!idDevice && !typeDevice) {
            res.status(400).json({
                message: "El parámetro 'id' o 'type' es requerido.",
                data: null
            });
            return;
        }

        let device;
        // buscar por id de dispositivo
        if (idDevice) {
            device = await Device.find
                ({ id: idDevice });
        } else {
            // buscar por nombre de dispositivo
            device = await Device.find
                ({ type: typeDevice });
        }

        if (device.length === 0) { // Si el largo del array es 0, no se encontró el dispositivo.
            res.status(404).json({
                message: "Dispositivo no encontrado.",
                data: null
            });
            return;
        }

        res.status(200).json({
            message: "Dispositivo encontrado.",
            data: device
        });
    } catch (error) {
        console.log("Error en device.controller.js -> getDevice(): ", error);
        res.status(500).json({ message: error.message });
    }
}

export async function getDevices(req, res) {
    try {
        const devices = await Device.find();
        if (devices.length === 0) {
            res.status(404).json({
                message: "No se encontraron dispositivos"
            });
        } else {
            res.status(200).json({
                message: "Lista de dispositivos",
                data: devices
            });
        }
    } catch (error) {
        console.log("Error en device.controller.js -> getDevices(): ", error);
        res.status(500).json({ message: error.message });
    }
}

export async function updateDevice(req, res) {
    try {
        const idDevice = req.query.id;
        const updatedData = req.body;

        if (!idDevice) {
            res.status(400).json({
                message: "El parámetro 'id' es requerido.",
                data: null
            });
            return;
        }

        const deviceMod = await Device.findOneAndUpdate({ id: idDevice }, updatedData, { new: true });

        if (!deviceMod) {
            res.status(404).json({
                message: "Dispositivo no encontrado.",
                data: null
            });
            return;
        }

        res.status(200).json({
            message: "Dispositivo actualizado correctamente.",
            data: deviceMod
        });

    } catch (error) {
        console.log("Error en device.controller.js -> updateDevice(): ", error);
        res.status(500).json({ message: error.message });
    }
}

export async function deleteDevice(req, res) {
    try {
        const idDevice = req.query.id;
        if (!idDevice) {
            res.status(400).json({
                message: "El parámetro 'id' es requerido.",
                data: null
            });
            return;
        }

        const device = await Device.findOneAndDelete({ id: idDevice });

        if (!device) {
            return res.status(404).json({
                message: "Dispositivo no encontrado",
                data: null
            });
        }

        res.status(200).json({
            message: "Dispositivo eliminado exitosamente.",
            data: device
        });

    } catch (error) {
        console.log("Error en device.controller.js -> deleteDevice(): ", error);
        res.status(500).json({ message: error.message });
    }
}

export async function createDevice(req, res) {
    try {
        // Comprobar existencia de ID antes de crear un nuevo dispositivo
        const idDevice = req.body.id;
        const deviceExist = await Device.findOne({ id: idDevice });

        if (deviceExist) {
            res.status(400).json({
                message: "Un dispositivo con el 'id' proporcionado ya existe.",
                data: null
            });
            return;
        }

        const deviceData = req.body;

        const newDevice = new Device(deviceData);
        await newDevice.save();

        res.status(201).json({
            message: "Dispositivo creado correctamente.",
            data: newDevice
        });

    } catch (error) {
        console.log("Error en device.controller.js -> createDevice(): ", error);
        res.status(500).json({ message: error.message });
    }
}
