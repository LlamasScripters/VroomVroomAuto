import { Router } from 'express';
import { PanneController } from '../controllers/panneController';
import { authenticate, authorizeAdminOrGestionnaire } from '../middlewares/authMiddleware';

const router = Router();
const controller = new PanneController();

router.get('/', authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.getAllPannes(req, res));
router.get('/:id',authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.getPanneById(req, res));
router.post('/',authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.createPanne(req, res));
router.put('/:id',authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.updatePanne(req, res));
router.delete('/:id',authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.deletePanne(req, res));

export default router;