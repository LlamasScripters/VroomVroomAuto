// infrastructure/platforms/express/src/routes/entretien.route.ts
import { Router } from 'express';
import { EntretienController } from '../controllers/entretienController';

const router = Router();
const controller = new EntretienController();

router.get('/', (req, res) => controller.getAllEntretiens(req, res));
router.get('/:id', (req, res) => controller.getEntretienById(req, res));
router.post('/', (req, res) => controller.createEntretien(req, res));
router.put('/:id', (req, res) => controller.updateEntretien(req, res));
router.delete('/:id', (req, res) => controller.deleteEntretien(req, res));

export default router;