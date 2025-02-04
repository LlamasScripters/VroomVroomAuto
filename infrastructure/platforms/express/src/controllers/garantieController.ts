import { Request, Response } from 'express';
import { GarantieUseCases } from '@application/usecases/garantie/GarantieCrudUseCases';
import { GarantieSQLRepository } from '../repositories/garantie.repository.sql';
import { GarantieMgRepository } from '../repositories/mongo/garantie.repository.mongo';
import * as GarantieMapper from '@application/mappers/GarantieMapper';
import { CreateGarantieDTO, GetGarantieDTO, UpdateGarantieDTO } from '@application/dtos/GarantieDTO';

export class GarantieController {
    private garantieUseCases: GarantieUseCases;

    constructor() {
        const garantieRepository = new GarantieSQLRepository();
        const garantieMongoRepository = new GarantieMgRepository();
        this.garantieUseCases = new GarantieUseCases(garantieRepository, garantieMongoRepository);
    }

    async createGarantie(req: Request, res: Response): Promise<void> {
        try {
            const garantieDTO: CreateGarantieDTO = req.body;
            const garantieResponse = await this.garantieUseCases.createGarantie(garantieDTO);
            res.status(201).json(garantieResponse);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getGarantieById(req: Request, res: Response): Promise<void> {
        try {
            const getGarantieDTO: GetGarantieDTO = { garantieId: req.params.id };
            const garantie = await this.garantieUseCases.getGarantieById(getGarantieDTO);

            if (!garantie) {
                res.status(404).json({ error: 'Garantie non trouvée' });
                return;
            }

            const garantieDTO = GarantieMapper.toDTO(garantie);
            res.json(garantieDTO);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateGarantie(req: Request, res: Response): Promise<void> {
        try {
            const updateGarantieDTO: UpdateGarantieDTO = {
                garantieId: req.params.id,
                ...req.body,
            };

            const updatedGarantie = await this.garantieUseCases.updateGarantie(updateGarantieDTO);

            if (!updatedGarantie) {
                res.status(404).json({ error: 'Garantie non trouvée' });
                return;
            }

            const garantieDTO = GarantieMapper.toDTO(updatedGarantie);
            res.json(garantieDTO);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAllGaranties(req: Request, res: Response): Promise<void> {
        try {
            const garanties = await this.garantieUseCases.listAllGaranties();
            const garantiesDTO = garanties.map((garantie) => GarantieMapper.toDTO(garantie));
            res.json(garantiesDTO);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
    
    async deleteGarantie(req: Request, res: Response): Promise<void> {
        try {
            const garantieId = req.params.id;
            const deletedGarantie = await this.garantieUseCases.deleteGarantie(garantieId);

            if (!deletedGarantie) {
                res.status(404).json({ error: 'Garantie non trouvée' });
                return;
            }

            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

}