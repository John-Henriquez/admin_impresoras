"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Enrutador de usuarios  */
import { getDevice, getDevices, createDevice, updateDevice, deleteDevice } from "../controllers/device.controller.js";

/** Middlewares de autorización */
import { isAdmin } from "../middlewares/auth.middleware.js";

// Se realiza una instancia de express
const router = Router();

// Define las rutas para los dispositivos
router.get("/", isAdmin, getDevices);
router.get("/1", isAdmin, getDevice);
router.post("/", isAdmin, createDevice);
router.put("/", isAdmin, updateDevice);
router.delete("/", isAdmin, deleteDevice);

export default router;
