import { Request, Response } from "express";
import { PanneUseCases } from "@application/usecases/panne/PanneCrudUseCases";
import { PanneSQLRepository } from "../repositories/panne.repository.sql";
import { PanneMgRepository } from "../repositories/mongo/panne.repository.mongo";
import * as PanneMapper from "@application/mappers/PanneMapper";
import { CreatePanneDTO, GetPanneDTO, UpdatePanneDTO } from "@application/dtos/PanneDTO";

export class PanneController {
    private panneUseCases: PanneUseCases;

    constructor() {
        const panneRepository = new PanneSQLRepository();
        const panneMongoRepository = new PanneMgRepository();
        this.panneUseCases = new PanneUseCases(panneRepository, panneMongoRepository);
    }

    async createPanne(req: Request, res: Response): Promise<void> {
        try {
            const panneDTO: CreatePanneDTO = req.body;
            const panneResponse = await this.panneUseCases.createPanne(panneDTO);
            res.status(201).json(panneResponse);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getPanneById(req: Request, res: Response): Promise<void> {
        try {
            const getPanneDTO: GetPanneDTO = { panneId: req.params.id };
            const panne = await this.panneUseCases.getPanneById(getPanneDTO);

            if (!panne) {
                res.status(404).json({ error: "Panne non trouvée" });
                return;
            }

            const panneDTO = PanneMapper.toDTO(panne);
            res.json(panneDTO);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async updatePanne(req: Request, res: Response): Promise<void> {
        try {
            const updatePanneDTO: UpdatePanneDTO = {
                panneId: req.params.id,
                ...req.body,
            };

            const updatedPanne = await this.panneUseCases.updatePanne(updatePanneDTO);

            if (!updatedPanne) {
                res.status(404).json({ error: "Panne non trouvée" });
                return;
            }

            const panneDTO = PanneMapper.toDTO(updatedPanne);
            res.json(panneDTO);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAllPannes(req: Request, res: Response): Promise<void> {
        try {
            const pannes = await this.panneUseCases.listAllPannes();
            const pannesDTO = pannes.map((panne) => PanneMapper.toDTO(panne));
            res.json(pannesDTO);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async deletePanne(req: Request, res: Response): Promise<void> {
        try {
            const panneId = req.params.id;
            const deleted = await this.panneUseCases.deletePanne(panneId);

            if (!deleted) {
                res.status(404).json({ error: "Panne non trouvée" });
                return;
            }

            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

}