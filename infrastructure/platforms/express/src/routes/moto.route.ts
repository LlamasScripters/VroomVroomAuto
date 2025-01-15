// infrastructure/platforms/express/routes/motoRoutes.ts

import { Router } from 'express';
import { MotoController } from '../controllers/motoController';

const router = Router();
const motoController = new MotoController();

router.post('/', (req, res) => motoController.createMoto(req, res));
router.get('/', (req, res) => motoController.getAllMotos(req, res));
router.get('/:id', (req, res) => motoController.getMoto(req, res));
router.put('/:id', (req, res) => motoController.updateMoto(req, res));
router.delete('/:id', (req, res) => motoController.deleteMoto(req, res));

export default router;