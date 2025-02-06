// infrastructure/platforms/express/routes/conducteur.route.ts
import { Router } from 'express';
import { ConducteurController } from '../controllers/conducteurController';

const router = Router();
const conducteurController = new ConducteurController();


router.get('/', (req, res) => conducteurController.getAllConducteurs(req, res));
router.get('/:id', (req, res) => conducteurController.getConducteurById(req, res));
router.get('/user/:userId', (req, res) => conducteurController.getConducteursByUser(req, res));

router.post('/', (req, res) => conducteurController.createConducteur(req, res));
router.put('/:id', (req, res) => conducteurController.updateConducteur(req, res));
router.delete('/:id', (req, res) => conducteurController.deleteConducteur(req, res));

export default router;