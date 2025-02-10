// infrastructure/platforms/express/routes/maintenanceRule.route.ts

import { Router } from 'express';
import { MaintenanceRuleController } from '../controllers/maintenanceRuleController';
import { authenticate, authorizeAdminOrGestionnaire } from '../middlewares/authMiddleware';

const router = Router();
const controller = new MaintenanceRuleController();

router.post('/rules', authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.createMaintenanceRule(req, res));
router.get('/rules', authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.getAllRules(req, res));
router.put('/rules/:id', authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.updateMaintenanceRule(req, res));
router.delete('/rules/:id', authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.deleteMaintenanceRule(req, res));
router.post('/planification', authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.planifierEntretien(req, res));

export default router;