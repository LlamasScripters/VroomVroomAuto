// infrastructure/platforms/express/routes/piece.route.ts

import { Router } from 'express';
import { PieceController } from '../controllers/pieceController';
import { authenticate, authorizeAdminOrGestionnaire } from '../middlewares/authMiddleware';

const router = Router();
const controller = new PieceController();

router.get('/', authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.getAllPieces(req, res));
router.get('/:id', authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.getPieceById(req, res));
router.post('/', authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.createPiece(req, res));
router.put('/:id', authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.updatePiece(req, res));
router.delete('/:id', authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.deletePiece(req, res));

router.patch('/:id/stock', authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.updateStock(req, res));
router.get('/critiques', authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.getPiecesCritiques(req, res));
router.get('/:id/disponibilite', authenticate, authorizeAdminOrGestionnaire, (req, res) => controller.verifierDisponibilite(req, res));

export default router;
