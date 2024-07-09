"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Enrutador de usuarios  */
import userRoutes from "./user.routes.js";

/** Enrutador de autenticación */
import authRoutes from "./auth.routes.js";

/** Enrutador de dispositivos */
import deviceRoutes from "./device.routes.js";

import supplyRoutes from "./supplyRoutes.js";

/** Enrutador de impresiones  */
import printRoutes from './print.routes.js';

// Se realiza una instancia de express
const router = Router();

// Define las rutas para los usuarios /api/users
router.use("/user",  userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
// Define las rutas para los dispositivos /api/device
router.use("/device", deviceRoutes);
// Define las rutas para los insumos /api/supply
router.use("/supply", supplyRoutes);
// Define las rutas para las impresiones /api/prints
router.use('/prints', printRoutes)

export default router;
