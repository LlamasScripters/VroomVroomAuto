// infrastructure/platforms/express/src/routes/maintenanceRule.route.ts
import { Router } from 'express';
import { MaintenanceRuleController } from '../controllers/maintenanceRuleController';

const router = Router();
const controller = new MaintenanceRuleController();

router.post('/rules', (req, res) => controller.createMaintenanceRule(req, res));
router.post('/planification', (req, res) => controller.planifierEntretien(req, res));

export default router;