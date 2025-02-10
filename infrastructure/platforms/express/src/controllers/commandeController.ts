// infrastructure/platforms/express/controllers/commandeController.ts
import { Request, Response } from 'express';
import { CommandeCrudUseCases } from '@application/usecases/commande/CommandeCrudUseCases';
import { CommandeSQLRepository } from '../repositories/commande.repository.sql';
import { PieceSQLRepository } from '../repositories/piece.repository.sql';
import * as CommandeMapper from '@application/mappers/CommandeMapper';
import { UpdateCommandeDTO } from '@application/dtos/CommandeDTO';
import { CommandeStatusUseCases } from '@application/usecases/commande/CommandeStatusUseCases';
import { PieceFournisseurSQLRepository } from '../repositories/pieceFournisseur.repository.sql';

export class CommandeController {
  private commandeUseCases: CommandeCrudUseCases;
  private commandeStatusUseCases: CommandeStatusUseCases;
  private pieceRepository: PieceSQLRepository;
  private pieceFournisseurRepository: PieceFournisseurSQLRepository

  constructor() {
    const commandeRepository = new CommandeSQLRepository();
    const pieceRepository = new PieceSQLRepository();
    const pieceFournisseurRepository = new PieceFournisseurSQLRepository();
    this.commandeUseCases = new CommandeCrudUseCases(commandeRepository, pieceFournisseurRepository);
    this.pieceRepository = pieceRepository;
    this.pieceFournisseurRepository = pieceFournisseurRepository;
    this.commandeStatusUseCases = new CommandeStatusUseCases(commandeRepository, this.pieceFournisseurRepository, this.pieceRepository);
  }

  async createCommande(req: Request, res: Response): Promise<void> {
    try {
      const commandeDTO = req.body;
      const commande = await this.commandeUseCases.createCommande(commandeDTO);
      const responseCommande = CommandeMapper.toDTO(commande);
      res.status(201).json(responseCommande);
    } catch (error: any) {
      console.error('Erreur création commande:', error);
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

  async updateCommandeStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { statut } = req.body;

      if (!['EN_ATTENTE', 'EN_COURS', 'LIVREE', 'ANNULEE'].includes(statut)) {
        res.status(400).json({ error: 'Statut invalide' });
        return;
      }

      const commande = await this.commandeStatusUseCases.updateStatus(id, statut);

      if (!commande) {
        res.status(404).json({ error: 'Commande non trouvée' });
        return;
      }

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
}