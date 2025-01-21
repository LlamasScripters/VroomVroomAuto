// infrastructure/platforms/express/controllers/MotoController.ts

import { Request, Response } from 'express';
import { MotoCrudUseCases } from '@application/usecases/moto/MotoCrudUseCases';
import { SqlMotoRepository } from '../repositories/moto.repository.sql';
import * as MotoMapper from '@application/mappers/MotoMapper';
import { CreateMotoDTO, GetMotoDTO, UpdateMotoDTO } from '@application/dtos/MotoDTO';

export class MotoController {
  private motoUseCases: MotoCrudUseCases;

  constructor() {
    const motoRepository = new SqlMotoRepository();
    this.motoUseCases = new MotoCrudUseCases(motoRepository);
  }

  async createMoto(req: Request, res: Response): Promise<void> {
    try {
      const motoDTO: CreateMotoDTO = req.body;
      const motoResponse = await this.motoUseCases.createMoto(motoDTO);
      res.status(201).json(motoResponse);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getMoto(req: Request, res: Response): Promise<void> {
    try {
      const getMotoDTO: GetMotoDTO = { motoId: req.params.id };
      const moto = await this.motoUseCases.getMotoById(getMotoDTO);

      if (!moto) {
        res.status(404).json({ error: 'Moto non trouvée' });
        return;
      }

      const motoDTO = MotoMapper.toDTO(moto);
      res.json(motoDTO);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateMoto(req: Request, res: Response): Promise<void> {
    try {
      const updateMotoDTO: UpdateMotoDTO = {
        motoId: req.params.id,
        ...req.body
      };

      const updatedMoto = await this.motoUseCases.updateMoto(updateMotoDTO);

      if (!updatedMoto) {
        res.status(404).json({ error: 'Moto non trouvée' });
        return;
      }

      const motoDTO = MotoMapper.toDTO(updatedMoto);
      res.json(motoDTO);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllMotos(req: Request, res: Response): Promise<void> {
    try {
      const motos = await this.motoUseCases.getAllMotos();
      const motoDTOs = motos.map(MotoMapper.toDTO);
      res.json(motoDTOs);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteMoto(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await this.motoUseCases.deleteMoto(req.params.id);

      if (!deleted) {
        res.status(404).json({ error: 'Moto non trouvée' });
        return;
      }

      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}