import { Router } from "express";
import { AuthController } from "@infrastructure/platforms/express/src/controllers/authController";
import { authenticate } from '../middlewares/authMiddleware';

const authRouter = Router();
const controller = new AuthController();

// LOGIN
authRouter.post("/login", (req, res) => controller.login(req, res));

// REGISTER
authRouter.post("/register", (req, res) => controller.register(req, res));

// CHANGE PASSWORD
authRouter.post("/change-password", (req, res) => controller.changePassword(req, res));

// RESET PASSWORD
authRouter.post("/reset-password", (req, res) => controller.resetPassword(req, res));

// VALIDATE EMAIL
authRouter.get("/validate-email", (req, res) => controller.validateEmail(req, res));

// CHECK USER TOKEN VALIDITY
authRouter.get("/me", authenticate, (req, res) => controller.me(req, res));



export default authRouter;
