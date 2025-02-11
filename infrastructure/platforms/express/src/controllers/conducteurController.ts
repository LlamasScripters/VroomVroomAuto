// infrastructure/platforms/express/controllers/conducteurController.ts
import { Request, Response } from 'express';
import { ConducteurCrudUseCases } from '@application/usecases/conducteur/ConducteurCrudUseCases';
import { ConducteurSQLRepository } from '../repositories/conducteur.repository.sql';
import { UserRepositorySQL } from '../repositories/user.repository.sql';
import * as ConducteurMapper from '@application/mappers/ConducteurMapper';
import { CreateConducteurDTO, UpdateConducteurDTO } from '@application/dtos/ConducteurDTO';

export class ConducteurController {
    private conducteurUseCases: ConducteurCrudUseCases;

    constructor() {
        const conducteurRepository = new ConducteurSQLRepository();
        const userRepository = new UserRepositorySQL();
        this.conducteurUseCases = new ConducteurCrudUseCases(conducteurRepository, userRepository);
    }

    async createConducteur(req: Request, res: Response): Promise<void> {
        try {
            const conducteurDTO: CreateConducteurDTO = {
                ...req.body,
            };
            const conducteur = await this.conducteurUseCases.createConducteur(conducteurDTO);
            const responseConducteur = ConducteurMapper.toDTO(conducteur);
            res.status(201).json(responseConducteur);
        } catch (error: any) {
            if (error.message === 'Un profil conducteur existe déjà pour cet utilisateur') {
                res.status(409).json({ error: error.message });
            } else if (error.message === 'Utilisateur non trouvé') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
    }

    async getConducteurById(req: Request, res: Response): Promise<void> {
        try {
            const conducteur = await this.conducteurUseCases.getConducteurById(req.params.id);
            if (!conducteur) {
                res.status(404).json({ error: 'Conducteur non trouvé' });
                return;
            }

            const conducteurDTO = ConducteurMapper.toDTO(conducteur);
            res.json(conducteurDTO);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateConducteur(req: Request, res: Response): Promise<void> {
        try {
            const updateConducteurDTO: UpdateConducteurDTO = {
                conducteurId: req.params.id,
                ...req.body
            };

            const updatedConducteur = await this.conducteurUseCases.updateConducteur(updateConducteurDTO);
            if (!updatedConducteur) {
                res.status(404).json({ error: 'Conducteur non trouvé' });
                return;
            }

            const conducteurDTO = ConducteurMapper.toDTO(updatedConducteur);
            res.json(conducteurDTO);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAllConducteurs(req: Request, res: Response): Promise<void> {
        try {
            const conducteurs = await this.conducteurUseCases.getAllConducteurs();
            const conducteurDTOs = conducteurs.map(ConducteurMapper.toDTO);
            res.json(conducteurDTOs);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getConducteursByUser(req: Request, res: Response): Promise<void> {
        try {
            const conducteurs = await this.conducteurUseCases.getConducteursByUser(req.params.userId);
            const conducteurDTOs = conducteurs.map(ConducteurMapper.toDTO);
            res.json(conducteurDTOs);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteConducteur(req: Request, res: Response): Promise<void> {
        try {
            const deleted = await this.conducteurUseCases.deleteConducteur(req.params.id);
            if (!deleted) {
                res.status(404).json({ error: 'Conducteur non trouvé' });
                return;
            }
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}