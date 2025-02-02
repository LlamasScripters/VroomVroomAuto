// infrastructure/platforms/express/routes/maintenanceRule.route.ts

import { Router } from 'express';
import { MaintenanceRuleController } from '../controllers/maintenanceRuleController';

const router = Router();
const controller = new MaintenanceRuleController();

router.post('/rules', (req, res) => controller.createMaintenanceRule(req, res));
router.get('/rules', (req, res) => controller.getAllRules(req, res));
router.put('/rules/:id', (req, res) => controller.updateMaintenanceRule(req, res));
router.delete('/rules/:id', (req, res) => controller.deleteMaintenanceRule(req, res));
router.post('/planification', (req, res) => controller.planifierEntretien(req, res));

export default router;