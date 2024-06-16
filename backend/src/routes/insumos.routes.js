"use strict";

import express from "express";
import { createInsumo, getInsumos, updateInsumo, deleteInsumo } from "../controllers/insumos.controller.js";

const router = express.Router();

router.post("/insumos", createInsumo);
router.get("/insumos", getInsumos);
router.put("/insumos/:id", updateInsumo);
router.delete("/insumos/:id", deleteInsumo);

export default router;
