import { Router } from 'express';
import { createPrint, getPrints, updatePrint, deletePrint } from '../controllers/print.controller.js';

const router = Router();

router.post('/prints', createPrint);
router.get('/prints', getPrints);
router.put('/prints/:id', updatePrint);
router.delete('/prints/:id', deletePrint);

export default router;
