// infrastructure/platforms/express/routes/motoRoutes.ts

import { Router } from 'express';
import { MotoController } from '../controllers/motoController';
import { authenticate, authorizeAdminOrGestionnaire } from '../middlewares/authMiddleware';

const router = Router();
const motoController = new MotoController();

router.post('/', authenticate, authorizeAdminOrGestionnaire, (req, res) => motoController.createMoto(req, res));
router.get('/', authenticate, (req, res) => motoController.getAllMotos(req, res));
router.get('/:id', authenticate, authorizeAdminOrGestionnaire, (req, res) => motoController.getMoto(req, res));
router.put('/:id', authenticate, authorizeAdminOrGestionnaire, (req, res) => motoController.updateMoto(req, res));
router.delete('/:id', authenticate, authorizeAdminOrGestionnaire, (req, res) => motoController.deleteMoto(req, res));

export default router;