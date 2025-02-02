import { Request, Response } from "express";
import { UserCrudUseCases } from "@application/usecases/user/UserCrudUseCases";
import { UserRepositorySQL } from "../repositories/user.repository.sql";
import * as UserMapper from "@application/mappers/UserMapper";
import { AuthentificationService } from "@application/services/AuthentificationService";
import { PasswordService } from "@application/services/PasswordService";

import { JwtAuthentificationService } from '@infrastructure/services/JwtAuthentificationService';
import { BcryptPasswordService } from '@infrastructure/services/BcryptPasswordService';
import { CreateUserDTO, UpdateUserDTO, GetUserDTO, UserDTO, DeleteUserDTO } from "@application/dtos/UserDTO";

export class UserController {
  private userCrudUseCases: UserCrudUseCases;
  private authenticationService: AuthentificationService;
  private passwordService: PasswordService;

  constructor() {
    const userRepository = new UserRepositorySQL();
    this.authenticationService = new JwtAuthentificationService();
    this.passwordService = new BcryptPasswordService();

    this.userCrudUseCases = new UserCrudUseCases(userRepository, this.authenticationService, this.passwordService);
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        res.status(401).json({ error: "Authorization token is missing" });
        return;
      }

      const userData: CreateUserDTO = req.body;

      const response = await this.userCrudUseCases.createUser(token, userData);
      res.status(201).json(response);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        res.status(401).json({ error: "Authorization token is missing" });
        return;
      }

      const userId: GetUserDTO = { userId: req.params.id };

      const user = await this.userCrudUseCases.getUserById(token, userId);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const userDTO = UserMapper.toDTO(user);
      res.json(userDTO);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        res.status(401).json({ error: "Authorization token is missing" });
        return;
      }

      const userData: UpdateUserDTO = { ...req.body, userId: req.params.id };

      const updatedUser = await this.userCrudUseCases.updateUser(token, userData);
      if (!updatedUser) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const userDTO = UserMapper.toDTO(updatedUser);
      res.json(userDTO);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        res.status(401).json({ error: "Authorization token is missing" });
        return;
      }

      const users = await this.userCrudUseCases.getAllUsers(token);
      const userDTOs = users.map(UserMapper.toDTO);
      res.json(userDTOs);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        res.status(401).json({ error: "Authorization token is missing" });
        return;
      }

      const userId: DeleteUserDTO = { userId: req.params.id };

      const deleted = await this.userCrudUseCases.deleteUser(token, userId.userId);
      if (!deleted) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
