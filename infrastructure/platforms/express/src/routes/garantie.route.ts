import { Router } from 'express';
import { GarantieController } from '../controllers/garantieController';
import { authenticate, authorizeAdminOrGestionnaire } from '../middlewares/authMiddleware';

const router = Router();
const controller = new GarantieController();

router.get('/', authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.getAllGaranties(req, res));
router.get('/:id', authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.getGarantieById(req, res));
router.post('/', authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.createGarantie(req, res));
router.put('/:id', authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.updateGarantie(req, res));
router.delete('/:id', authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.deleteGarantie(req, res));

export default router;