import { Router } from 'express';
import { PanneController } from '../controllers/panneController';

const router = Router();
const controller = new PanneController();

router.get('/', (req, res) => controller.getAllPannes(req, res));
router.get('/:id', (req, res) => controller.getPanneById(req, res));
router.post('/', (req, res) => controller.createPanne(req, res));
router.put('/:id', (req, res) => controller.updatePanne(req, res));
router.delete('/:id', (req, res) => controller.deletePanne(req, res));

export default router;