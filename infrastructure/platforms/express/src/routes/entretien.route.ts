// infrastructure/platforms/express/src/routes/entretien.route.ts
import { Router } from 'express';
import { EntretienController } from '../controllers/entretienController';

const router = Router();
const controller = new EntretienController();

router.get('/', (req, res) => controller.getAllEntretiens(req, res));
router.get('/:id', (req, res) => controller.getEntretienById(req, res));
router.post('/planification', (req, res) => controller.planifierEntretien(req, res));
router.put('/:id', (req, res) => controller.updateEntretien(req, res));

export default router;