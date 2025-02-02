// infrastructure/platforms/express/controllers/EntretienController.ts

import { Request, Response } from 'express';
import { EntretienCrudUseCases } from '@application/usecases/entretien/EntretienCrudUseCases';
import { EntretienSQLRepository } from '../repositories/entretien.repository.sql';
import * as EntretienMapper from '@application/mappers/EntretienMapper';
import { CreateEntretienDTO, GetEntretienDTO, UpdateEntretienDTO } from '@application/dtos/EntretienDTO';

export class EntretienController {
  private entretienUseCases: EntretienCrudUseCases;

  constructor() {
    const entretienRepository = new EntretienSQLRepository();
    this.entretienUseCases = new EntretienCrudUseCases(entretienRepository);
  }

  async createEntretien(req: Request, res: Response): Promise<void> {
    try {
      const entretienDTO: CreateEntretienDTO = req.body;
      const entretienResponse = await this.entretienUseCases.createEntretien(entretienDTO);
      res.status(201).json(entretienResponse);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getEntretienById(req: Request, res: Response): Promise<void> {
    try {
      const getEntretienDTO: GetEntretienDTO = { entretienId: req.params.id };
      const entretien = await this.entretienUseCases.getEntretienById(getEntretienDTO);

      if (!entretien) {
        res.status(404).json({ error: 'Entretien non trouvé' });
        return;
      }

      const entretienDTO = EntretienMapper.toDTO(entretien);
      res.json(entretienDTO);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateEntretien(req: Request, res: Response): Promise<void> {
    try {
      const updateEntretienDTO: UpdateEntretienDTO = {
        entretienId: req.params.id,
        ...req.body
      };

      const updatedEntretien = await this.entretienUseCases.updateEntretien(updateEntretienDTO);

      if (!updatedEntretien) {
        res.status(404).json({ error: 'Entretien non trouvé' });
        return;
      }

      const entretienDTO = EntretienMapper.toDTO(updatedEntretien);
      res.json(entretienDTO);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllEntretiens(req: Request, res: Response): Promise<void> {
    try {
      const entretiens = await this.entretienUseCases.getAllEntretiens();
      const entretienDTOs = entretiens.map(EntretienMapper.toDTO);
      res.json(entretienDTOs);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteEntretien(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await this.entretienUseCases.deleteEntretien(req.params.id);

      if (!deleted) {
        res.status(404).json({ error: 'Entretien non trouvé' });
        return;
      }

      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}