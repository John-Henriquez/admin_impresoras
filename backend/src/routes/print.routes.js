"use strict";
import { Router } from 'express';
import { createPrint, getPrints, getPrint, updatePrint, deletePrint } from '../controllers/print.controller.js';

const router = Router();

// ruta para crear una impresion
router.post('/', createPrint);

// ruta para obtener todas las impresiones
router.get('/', getPrints);

// ruta para obtener una impresion especifica
router.get('/1', getPrint);

// ruta para actualizar una impresion especifica
router.put('/1', updatePrint);

// ruta para eliminar una impresion especifica
router.delete('/1', deletePrint);

export default router;
