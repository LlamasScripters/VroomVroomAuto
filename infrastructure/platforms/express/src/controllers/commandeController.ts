// infrastructure/platforms/express/controllers/commandeController.ts
import { Request, Response } from 'express';
import { CommandeCrudUseCases } from '@application/usecases/commande/CommandeCrudUseCases';
import { CommandeSQLRepository } from '../repositories/commande.repository.sql';
import { PieceSQLRepository } from '../repositories/piece.repository.sql';
import * as CommandeMapper from '@application/mappers/CommandeMapper';
import { CreateCommandeDTO, UpdateCommandeDTO } from '@application/dtos/CommandeDTO';

export class CommandeController {
  private commandeUseCases: CommandeCrudUseCases;

  constructor() {
    const commandeRepository = new CommandeSQLRepository();
    const pieceRepository = new PieceSQLRepository();
    this.commandeUseCases = new CommandeCrudUseCases(commandeRepository, pieceRepository);
  }

  async createCommande(req: Request, res: Response): Promise<void> {
    try {
      const commandeDTO: CreateCommandeDTO = req.body;
      const commande = await this.commandeUseCases.createCommande(commandeDTO);
      const responseCommande = CommandeMapper.toDTO(commande);
      res.status(201).json(responseCommande);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getCommandeById(req: Request, res: Response): Promise<void> {
    try {
      const commande = await this.commandeUseCases.getCommandeById(req.params.id);

      if (!commande) {
        res.status(404).json({ error: 'Commande non trouvée' });
        return;
      }

      const commandeDTO = CommandeMapper.toDTO(commande);
      res.json(commandeDTO);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateCommande(req: Request, res: Response): Promise<void> {
    try {
      const updateCommandeDTO: UpdateCommandeDTO = {
        commandeId: req.params.id,
        ...req.body
      };

      const updatedCommande = await this.commandeUseCases.updateCommande(updateCommandeDTO);

      if (!updatedCommande) {
        res.status(404).json({ error: 'Commande non trouvée' });
        return;
      }

      const commandeDTO = CommandeMapper.toDTO(updatedCommande);
      res.json(commandeDTO);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllCommandes(req: Request, res: Response): Promise<void> {
    try {
      const commandes = await this.commandeUseCases.getAllCommandes();
      const commandeDTOs = commandes.map(CommandeMapper.toDTO);
      res.json(commandeDTOs);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteCommande(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await this.commandeUseCases.deleteCommande(req.params.id);

      if (!deleted) {
        res.status(404).json({ error: 'Commande non trouvée' });
        return;
      }

      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}