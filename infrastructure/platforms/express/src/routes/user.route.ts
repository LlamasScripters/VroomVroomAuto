import { Router } from 'express';
import { UserController } from '@infrastructure/platforms/express/src/controllers/userController'; 

const userRouter = Router();
const userController = new UserController();

// POST /users
userRouter.post('/', (req, res) => userController.createUser(req, res));

// GET /users/:id
userRouter.get('/:id', (req, res) => userController.getUser(req, res));

// PUT /users/:id
userRouter.put('/:id', (req, res) => userController.updateUser(req, res));

// GET /users
userRouter.get('/', (req, res) => userController.getAllUsers(req, res));

// DELETE /users/:id
userRouter.delete('/:id', (req, res) => userController.deleteUser(req, res));

export default userRouter;
