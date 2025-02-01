// infrastructure/controllers/AuthController.ts (exemple)
import { Request, Response } from "express";
import { UserAuthUseCases } from "@application/usecases/auth/UserAuthUseCases";

import { AuthentificationService } from "@application/services/AuthentificationService";
import { PasswordService } from "@application/services/PasswordService";
import { NotificationService } from "@application/services/NotificationService";

import { JwtAuthentificationService } from "@infrastructure/services/JwtAuthentificationService";
import { BcryptPasswordService } from "@infrastructure/services/BcryptPasswordService";
import { BrevoNotificationService } from "@infrastructure/services/BrevoNotificationService";
import { AuthRepositorySQL } from "../repositories/auth.repository.sql";

import { RegisterDTO, LoginDTO, ForgotPasswordDTO, ChangePasswordDTO } from "@application/dtos/AuthDTO";

export class AuthController {
  private authUseCases: UserAuthUseCases;

  constructor() {
    const authRepository = new AuthRepositorySQL();
    const authService: AuthentificationService = new JwtAuthentificationService();
    const passService: PasswordService = new BcryptPasswordService();
    const notifService: NotificationService = new BrevoNotificationService();

    this.authUseCases = new UserAuthUseCases(
      authRepository,
      authService,
      passService,
      notifService
    );
  }

  // POST /auth/login
  async login(req: Request, res: Response): Promise<void> {
    try {
      const loginDTO: LoginDTO = req.body;
      const token = await this.authUseCases.login(loginDTO);
      console.log(token);
      if (!token) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }
      res.json({ token });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // POST /auth/register
  async register(req: Request, res: Response): Promise<void> {
    try {
      const registerDTO: RegisterDTO = req.body;
      await this.authUseCases.register(registerDTO);
      res.status(201).json({ message: "User registered successfully" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // POST /auth/change-password
  async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const body: ChangePasswordDTO = req.body;
      const user = await this.authUseCases.changePassword(body);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json({ message: "Password updated successfully" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // POST /auth/reset-password
  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const body: ForgotPasswordDTO = req.body;
      const success = await this.authUseCases.resetPassword(body);
      if (!success) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json({ message: "Reset email sent" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // GET /auth/validate-email?token=xxxx
  async validateEmail(req: Request, res: Response): Promise<void> {
    try {
      const token = req.query.token as string;
      if (!token) {
        res.status(400).json({ error: "Missing token" });
        return;
      }

      const validated = await this.authUseCases.validateEmail(token);
      if (!validated) {
        res.status(404).json({ error: "User not found or invalid token" });
        return;
      }

      res.json({ message: "Email validated successfully" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async me(req: Request, res: Response): Promise<void> {
    try {
      
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
         res.status(401).json({ error: "No token provided" });
         return;
      }
  
      // Vérifier le token (authService)
      const userId = await this.authUseCases.verifyToken(token); 
  
      if (!userId) {
        res.status(401).json({ error: "Token invalid or expired" });
        return;
      }
  
      const user = await this.authUseCases.getUserById(userId);
  
      if (!user) {
         res.status(404).json({ error: "User not found" });
         return;
      }
  
      res.json({
        id: user.userId.toString(),
        email: user.email.toString(),
        role: user.role.toString(),

      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }


}
