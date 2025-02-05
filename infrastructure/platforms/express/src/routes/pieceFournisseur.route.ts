// infrastructure/platforms/express/routes/pieceFournisseur.route.ts
import { Router } from 'express';
import { PieceFournisseurController } from '../controllers/pieceFournisseurController';


const router = Router();
const controller = new PieceFournisseurController();

// Routes publiques (accessibles au gestionnaire)
router.get('/', (req, res) => controller.getAllPiecesFournisseur(req, res));
router.get('/:id',  (req, res) => controller.getPieceFournisseurById(req, res));
router.get('/categorie/:categorie', (req, res) => controller.getPiecesFournisseurByCategorie(req, res));

// Routes à protéger (accessibles uniquement à l'admin)
router.post('/', (req, res) => controller.createPieceFournisseur(req, res));
router.put('/:id', (req, res) => controller.updatePieceFournisseur(req, res));
router.delete('/:id', (req, res) => controller.deletePieceFournisseur(req, res));

export default router;