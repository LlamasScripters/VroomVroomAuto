// infrastructure/platforms/express/routes/piece.route.ts

import { Router } from 'express';
import { PieceController } from '../controllers/pieceController';

const router = Router();
const controller = new PieceController();

router.get('/', (req, res) => controller.getAllPieces(req, res));
router.get('/:id', (req, res) => controller.getPieceById(req, res));
router.post('/', (req, res) => controller.createPiece(req, res));
router.put('/:id', (req, res) => controller.updatePiece(req, res));
router.delete('/:id', (req, res) => controller.deletePiece(req, res));

router.patch('/:id/stock', (req, res) => controller.updateStock(req, res));
router.get('/critiques', (req, res) => controller.getPiecesCritiques(req, res));


export default router;
