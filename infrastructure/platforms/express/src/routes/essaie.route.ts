import { Router } from 'express';
import { EssaiController } from '../controllers/essaieController';
import { authenticate, authorizeAdminOrGestionnaire } from '../middlewares/authMiddleware';

const router = Router();
const controller = new EssaiController();

router.get('/', authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.getAllEssais(req, res));
router.get('/:id',authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.getEssaiById(req, res));
router.post('/', (req, res) => controller.createEssai(req, res));
router.put('/:id',authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.updateEssai(req, res));
router.delete('/:id',authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.deleteEssai(req, res));

export default router;