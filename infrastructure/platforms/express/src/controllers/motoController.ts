// infrastructure/platforms/express/controllers/MotoController.ts

import { Request, Response } from 'express';
import { MotoUseCases } from '../../../../../application/usecases/moto/MotoCrudUseCases';
import { SqlMotoRepository } from './../repositories/moto.repository.sql';
import { UUID } from '../../../../../domain/value-objects/UUID';

export class MotoController {
  private motoUseCases: MotoUseCases;

  constructor() {
    const motoRepository = new SqlMotoRepository();
    this.motoUseCases = new MotoUseCases(motoRepository);
  }

  async createMoto(req: Request, res: Response): Promise<void> {
    try {
      const moto = await this.motoUseCases.createMoto(
        req.body.marque,
        req.body.model,
        req.body.kilometrage,
        req.body.dateMiseEnService,
        req.body.statut,
        req.body.serialNumber,
        new UUID(req.body.clientId)
      );
      res.status(201).json(moto);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getMoto(req: Request, res: Response): Promise<void> {
    try {
      const motoId = new UUID(req.params.id);
      const moto = await this.motoUseCases.getMotoById(motoId);

      if (!moto) {
        res.status(404).json({ error: 'Moto non trouvée' });
        return;
      }

      res.json(moto);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateMoto(req: Request, res: Response): Promise<void> {
    try {
      const motoId = new UUID(req.params.id);
      const updatedMoto = await this.motoUseCases.updateMoto(motoId, req.body);

      if (!updatedMoto) {
        res.status(404).json({ error: 'Moto non trouvée' });
        return;
      }

      res.json(updatedMoto);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteMoto(req: Request, res: Response): Promise<void> {
    try {
      const motoId = new UUID(req.params.id);
      const deleted = await this.motoUseCases.deleteMoto(motoId);

      if (!deleted) {
        res.status(404).json({ error: 'Moto non trouvée' });
        return;
      }

      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllMotos(req: Request, res: Response): Promise<void> {
    try {
      const motos = await this.motoUseCases.getAllMotos();
      res.json(motos);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}