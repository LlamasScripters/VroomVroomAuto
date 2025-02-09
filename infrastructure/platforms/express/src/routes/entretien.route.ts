// infrastructure/platforms/express/src/routes/entretien.route.ts
import { Router } from 'express';
import { EntretienController } from '../controllers/entretienController';
import { authenticate, authorizeAdminOrGestionnaire,authorizeAdmin, authorizeUser,authorizeGestionnaire } from '../middlewares/authMiddleware';
const router = Router();
const controller = new EntretienController();

router.get('/',authenticate, authorizeAdmin,authorizeUser, authorizeGestionnaire, (req, res) => controller.getAllEntretiens(req, res));
router.get('/:id',authenticate, authorizeAdmin, authorizeUser, authorizeGestionnaire, (req, res) => controller.getEntretienById(req, res));
router.post('/',authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.createEntretien(req, res));
router.put('/:id',authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.updateEntretien(req, res));
router.delete('/:id',authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.deleteEntretien(req, res));

export default router;