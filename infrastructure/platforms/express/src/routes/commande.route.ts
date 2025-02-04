// infrastructure/platforms/express/routes/commande.route.ts

import { Router } from 'express';
import { CommandeController } from '../controllers/commandeController';

const router = Router();
const controller = new CommandeController();


router.get('/', (req, res) => controller.getAllCommandes(req, res));
router.get('/:id', (req, res) => controller.getCommandeById(req, res));
router.post('/', (req, res) => controller.createCommande(req, res));
router.put('/:id', (req, res) => controller.updateCommande(req, res));
router.delete('/:id', (req, res) => controller.deleteCommande(req, res));


export default router;
