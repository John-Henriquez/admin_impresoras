"use strict";
// Importa el módulo 'Router' de 'express' para crear el enrutador
import { Router } from "express";
// Importa las funciones del controlador de insumos
import { createSupply, getSupplies, updateSupply, deleteSupply } from "../controllers/supplyController.js";

// Crea una instancia del enrutador
const router = Router();
router.post("/supplies", createSupply);
router.get("/supplies", getSupplies);
router.put("/supplies/:_id", updateSupply);
router.delete("/supplies/:_id", deleteSupply);


export default router;
