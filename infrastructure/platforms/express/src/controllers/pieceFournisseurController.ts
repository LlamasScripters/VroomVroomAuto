// infrastructure/platforms/express/controllers/pieceFournisseurController.ts
import { Request, Response } from 'express';
import { PieceFournisseurCrudUseCases } from '@application/usecases/pieceFournisseur/PieceFournisseurCrudUseCases';
import { PieceFournisseurSQLRepository } from '../repositories/pieceFournisseur.repository.sql';
import * as PieceFournisseurMapper from '@application/mappers/PieceFournisseurMapper';

export class PieceFournisseurController {
    private pieceFournisseurUseCases: PieceFournisseurCrudUseCases;

    constructor() {
        const pieceFournisseurRepository = new PieceFournisseurSQLRepository();
        this.pieceFournisseurUseCases = new PieceFournisseurCrudUseCases(pieceFournisseurRepository);
    }

    async createPieceFournisseur(req: Request, res: Response): Promise<void> {
        try {
            const piece = await this.pieceFournisseurUseCases.createPieceFournisseur(req.body);
            const pieceDTO = PieceFournisseurMapper.toDTO(piece);
            res.status(201).json(pieceDTO);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getPieceFournisseurById(req: Request, res: Response): Promise<void> {
        try {
            const piece = await this.pieceFournisseurUseCases.getPieceFournisseurById(req.params.id);
            if (!piece) {
                res.status(404).json({ error: 'Pièce non trouvée' });
                return;
            }
            const pieceDTO = PieceFournisseurMapper.toDTO(piece);
            res.json(pieceDTO);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAllPiecesFournisseur(req: Request, res: Response): Promise<void> {
        try {
            const pieces = await this.pieceFournisseurUseCases.getAllPiecesFournisseur();
            const pieceDTOs = pieces.map(PieceFournisseurMapper.toDTO);
            res.json(pieceDTOs);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async updatePieceFournisseur(req: Request, res: Response): Promise<void> {
        try {
            const piece = await this.pieceFournisseurUseCases.updatePieceFournisseur(req.params.id, req.body);
            const pieceDTO = PieceFournisseurMapper.toDTO(piece);
            res.json(pieceDTO);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async deletePieceFournisseur(req: Request, res: Response): Promise<void> {
        try {
            const deleted = await this.pieceFournisseurUseCases.deletePieceFournisseur(req.params.id);
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Pièce non trouvée' });
            }
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getPiecesFournisseurByCategorie(req: Request, res: Response): Promise<void> {
        try {
            const pieces = await this.pieceFournisseurUseCases.getPiecesFournisseurByCategorie(req.params.categorie);
            const pieceDTOs = pieces.map(PieceFournisseurMapper.toDTO);
            res.json(pieceDTOs);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}