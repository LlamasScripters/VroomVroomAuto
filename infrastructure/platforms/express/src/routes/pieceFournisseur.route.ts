// infrastructure/platforms/express/routes/pieceFournisseur.route.ts
import { Router } from 'express';
import { PieceFournisseurController } from '../controllers/pieceFournisseurController';
import { authenticate, authorizeAdminOrGestionnaire, authorizeAdmin } from '../middlewares/authMiddleware';


const router = Router();
const controller = new PieceFournisseurController();

// Routes publiques (accessibles au gestionnaire)
router.get('/', authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.getAllPiecesFournisseur(req, res));
router.get('/:id', authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.getPieceFournisseurById(req, res));
router.get('/categorie/:categorie', authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.getPiecesFournisseurByCategorie(req, res));

// Routes à protéger (accessibles uniquement à l'admin)
router.post('/', authenticate, authorizeAdmin, (req, res) => controller.createPieceFournisseur(req, res));
router.put('/:id', authenticate, authorizeAdmin, (req, res) => controller.updatePieceFournisseur(req, res));
router.delete('/:id', authenticate, authorizeAdmin, (req, res) => controller.deletePieceFournisseur(req, res));

export default router;