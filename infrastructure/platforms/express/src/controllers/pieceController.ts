// infrastructure/platforms/express/controllers/PieceController.ts
import { Request, Response } from 'express';
import { PieceCrudUseCases } from '@application/usecases/piece/PieceCrudUseCases';
import { PieceSQLRepository } from '../repositories/piece.repository.sql';
import * as PieceMapper from '@application/mappers/PieceMapper';
import { CreatePieceDTO, UpdatePieceDTO } from '@application/dtos/PieceDTO';

export class PieceController {
  private pieceUseCases: PieceCrudUseCases;

  constructor() {
    const pieceRepository = new PieceSQLRepository();
    this.pieceUseCases = new PieceCrudUseCases(pieceRepository);
  }

  async createPiece(req: Request, res: Response): Promise<void> {
    try {
      const pieceDTO: CreatePieceDTO = req.body;
      const piece = await this.pieceUseCases.createPiece(pieceDTO);
      const responsePiece = PieceMapper.toDTO(piece);
      res.status(201).json(responsePiece);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getPieceById(req: Request, res: Response): Promise<void> {
    try {
      const piece = await this.pieceUseCases.getPieceById(req.params.id);

      if (!piece) {
        res.status(404).json({ error: 'Pièce non trouvée' });
        return;
      }

      const pieceDTO = PieceMapper.toDTO(piece);
      res.json(pieceDTO);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updatePiece(req: Request, res: Response): Promise<void> {
    try {
      const updatePieceDTO: UpdatePieceDTO = {
        pieceId: req.params.id,
        ...req.body
      };

      const updatedPiece = await this.pieceUseCases.updatePiece(updatePieceDTO);

      if (!updatedPiece) {
        res.status(404).json({ error: 'Pièce non trouvée' });
        return;
      }

      const pieceDTO = PieceMapper.toDTO(updatedPiece);
      res.json(pieceDTO);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateStock(req: Request, res: Response): Promise<void> {
    try {
      const { quantite } = req.body;
      if (typeof quantite !== 'number') {
        res.status(400).json({ error: 'La quantité doit être un nombre' });
        return;
      }

      const updatedPiece = await this.pieceUseCases.updateStock(req.params.id, quantite);

      if (!updatedPiece) {
        res.status(404).json({ error: 'Pièce non trouvée' });
        return;
      }

      const pieceDTO = PieceMapper.toDTO(updatedPiece);
      res.json(pieceDTO);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllPieces(req: Request, res: Response): Promise<void> {
    try {
      const pieces = await this.pieceUseCases.getAllPieces();
      const pieceDTOs = pieces.map(PieceMapper.toDTO);
      res.json(pieceDTOs);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getPiecesCritiques(req: Request, res: Response): Promise<void> {
    try {
      const pieces = await this.pieceUseCases.getPiecesCritiques();
      const pieceDTOs = pieces.map(PieceMapper.toDTO);
      res.json(pieceDTOs);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deletePiece(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await this.pieceUseCases.deletePiece(req.params.id);

      if (!deleted) {
        res.status(404).json({ error: 'Pièce non trouvée' });
        return;
      }

      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async verifierDisponibilite(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const quantite = parseInt(req.query.quantite as string);
  
      if (isNaN(quantite)) {
        res.status(400).json({ error: 'La quantité doit être un nombre' });
        return;
      }
  
      const piece = await this.pieceUseCases.getPieceById(id);
  
      if (!piece) {
        res.status(404).json({ error: 'Pièce non trouvée' });
        return;
      }
  
      const disponible = piece.quantiteEnStock >= quantite;
      res.json({ disponible });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}