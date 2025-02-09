import { Router } from 'express';
import { UserController } from '@infrastructure/platforms/express/src/controllers/userController'; 
import { authenticate, authorizeAdminOrGestionnaire } from '../middlewares/authMiddleware';

const userRouter = Router();
const userController = new UserController();

// POST /users
userRouter.post('/',authenticate, authorizeAdminOrGestionnaire, (req, res) => userController.createUser(req, res));

// GET /users/:id
userRouter.get('/:id',authenticate, authorizeAdminOrGestionnaire, (req, res) => userController.getUser(req, res));

// PUT /users/:id
userRouter.put('/:id',authenticate, authorizeAdminOrGestionnaire, (req, res) => userController.updateUser(req, res));

// GET /users
userRouter.get('/',authenticate, authorizeAdminOrGestionnaire, (req, res) => userController.getAllUsers(req, res));

// DELETE /users/:id
userRouter.delete('/:id',authenticate, authorizeAdminOrGestionnaire, (req, res) => userController.deleteUser(req, res));

export default userRouter;
