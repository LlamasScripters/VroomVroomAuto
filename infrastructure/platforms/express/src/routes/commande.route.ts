// infrastructure/platforms/express/routes/commande.route.ts

import { Router } from 'express';
import { CommandeController } from '../controllers/commandeController';
import { authenticate, authorizeAdminOrGestionnaire } from '../middlewares/authMiddleware';

const router = Router();
const controller = new CommandeController();


router.get('/', authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.getAllCommandes(req, res));
router.get('/:id', authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.getCommandeById(req, res));
router.post('/', authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.createCommande(req, res));
router.put('/:id', authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.updateCommande(req, res));
router.delete('/:id', authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.deleteCommande(req, res));
router.patch('/:id/statut', authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.updateCommandeStatus(req, res));


export default router;
