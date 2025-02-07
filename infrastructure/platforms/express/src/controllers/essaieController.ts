import { Request, Response } from 'express';
import { EssaiUseCases } from '@application/usecases/essai/EssaiCrudUseCases';
import { EssaiSQLRepository } from '../repositories/essaie.repository.sql';
import { EssaiMgRepository } from '../repositories/mongo/essaie.repository.mongo';
import * as EssaiMapper from '@application/mappers/EssaiMapper';
import { CreateEssaiDTO, GetEssaiDTO, UpdateEssaiDTO } from '@application/dtos/EssaiDTO';

export class EssaiController {
    private essaiUseCases: EssaiUseCases;

    constructor() {
        const essaiRepository = new EssaiSQLRepository();
        const essaiMongoRepository = new EssaiMgRepository();
        this.essaiUseCases = new EssaiUseCases(essaiRepository, essaiMongoRepository);
    }

    async createEssai(req: Request, res: Response): Promise<void> {
        try {
            const essaiDTO: CreateEssaiDTO = req.body;
            const essaiResponse = await this.essaiUseCases.createEssai(essaiDTO);
            res.status(201).json(essaiResponse);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getEssaiById(req: Request, res: Response): Promise<void> {
        try {
            const getEssaiDTO: GetEssaiDTO = { essaiId: req.params.id };
            const essai = await this.essaiUseCases.getEssaiById(getEssaiDTO);

            if (!essai) {
                res.status(404).json({ error: 'Essai non trouvé' });
                return;
            }

            const essaiDTO = EssaiMapper.toDTO(essai);
            res.json(essaiDTO);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getEssaisByConducteurId(req: Request, res: Response): Promise<void> {
        try {
            const conducteurId = req.params.id;
            const essais = await this.essaiUseCases.getEssaisByConducteurId(conducteurId);
            const essaisDTO = essais.map((essai) => EssaiMapper.toDTO(essai));
            res.json(essaisDTO);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateEssai(req: Request, res: Response): Promise<void> {
        try {
            const updateEssaiDTO: UpdateEssaiDTO = {
                essaiId: req.params.id,
                ...req.body,
            };

            const updatedEssai = await this.essaiUseCases.updateEssai(updateEssaiDTO);

            if (!updatedEssai) {
                res.status(404).json({ error: 'Essai non trouvé' });
                return;
            }

            const essaiDTO = EssaiMapper.toDTO(updatedEssai);
            res.json(essaiDTO);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteEssai(req: Request, res: Response): Promise<void> {
        try {
            const essaiId = req.params.id;
            const deletedEssai = await this.essaiUseCases.deleteEssai(essaiId);

            if (!deletedEssai) {
                res.status(404).json({ error: 'Essai non trouvé' });
                return;
            }

            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAllEssais(req: Request, res: Response): Promise<void> {
        try {
            const essais = await this.essaiUseCases.listAllEssais();
            const essaisDTO = essais.map((essai) => EssaiMapper.toDTO(essai));
            res.json(essaisDTO);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

}