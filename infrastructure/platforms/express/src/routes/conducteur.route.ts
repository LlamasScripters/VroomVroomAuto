// infrastructure/platforms/express/routes/conducteur.route.ts
import { Router } from 'express';
import { ConducteurController } from '../controllers/conducteurController';
import { authenticate, authorizeAdminOrGestionnaire } from '../middlewares/authMiddleware';

const router = Router();
const conducteurController = new ConducteurController();


router.get('/', authenticate, authorizeAdminOrGestionnaire, (req, res) => conducteurController.getAllConducteurs(req, res));
router.get('/:id', authenticate, authorizeAdminOrGestionnaire, (req, res) => conducteurController.getConducteurById(req, res));
router.get('/user/:userId', authenticate, authorizeAdminOrGestionnaire, (req, res) => conducteurController.getConducteursByUser(req, res));

router.post('/', authenticate, authorizeAdminOrGestionnaire, (req, res) => conducteurController.createConducteur(req, res));
router.put('/:id', authenticate, authorizeAdminOrGestionnaire, (req, res) => conducteurController.updateConducteur(req, res));
router.delete('/:id', authenticate, authorizeAdminOrGestionnaire, (req, res) => conducteurController.deleteConducteur(req, res));

export default router;