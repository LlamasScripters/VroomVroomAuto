// infrastructure/platforms/express/controllers/commandeController.ts
import { Request, Response } from 'express';
import { CommandeCrudUseCases } from '@application/usecases/commande/CommandeCrudUseCases';
import { CommandeSQLRepository } from '../repositories/commande.repository.sql';
import { PieceSQLRepository } from '../repositories/piece.repository.sql';
import * as CommandeMapper from '@application/mappers/CommandeMapper';
import { CreateCommandeDTO, UpdateCommandeDTO } from '@application/dtos/CommandeDTO';
import { UUID } from '@domain/value-objects/UUID';
import { CommandeStatusUseCases } from '@application/usecases/commande/CommandeStatusUseCases';
export class CommandeController {
  private commandeUseCases: CommandeCrudUseCases;
  private pieceRepository: PieceSQLRepository;
  private commandeStatusUseCases: CommandeStatusUseCases;

  constructor() {
    const commandeRepository = new CommandeSQLRepository();
    const pieceRepository = new PieceSQLRepository();
    this.commandeUseCases = new CommandeCrudUseCases(commandeRepository, pieceRepository);
    this.pieceRepository = pieceRepository;

    this.commandeStatusUseCases = new CommandeStatusUseCases(commandeRepository, pieceRepository);
  }

  async createCommande(req: Request, res: Response): Promise<void> {
    try {
      const commandeDTO = req.body;
      
      // récupération des détails de la pièce avant de créer la commande
      const piece = await this.pieceRepository.findById(new UUID(commandeDTO.pieceId));
      if (!piece) {
        res.status(404).json({ error: 'Pièce non trouvée' });
        return;
      }

      // calcul du coût total
      const coutTotal = piece.prixUnitaire ? piece.prixUnitaire * commandeDTO.quantiteCommandee : 0;

      // création de la commande en passant directement les valeurs attendues
      const commande = await this.commandeUseCases.createCommande({
        pieceId: commandeDTO.pieceId,
        quantiteCommandee: commandeDTO.quantiteCommandee,
        dateLivraisonPrevue: commandeDTO.dateLivraisonPrevue,
        userId: commandeDTO.userId
      });

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