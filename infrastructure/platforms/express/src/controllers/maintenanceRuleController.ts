// infrastructure/platforms/express/controllers/maintenanceRuleController.ts

import { Request, Response } from 'express';
import { MaintenanceRuleCrudUseCase } from '@application/usecases/maintenance/MaintenanceRuleCrudUseCases';
import { PlanifierEntretienUseCase } from '@application/usecases/maintenance/PlanifierEntretienUseCase';
import { MaintenanceRuleSQLRepository } from '../repositories/maintenanceRule.repository.sql';
import { SqlMotoRepository } from '../repositories/moto.repository.sql';
import { EntretienSQLRepository } from '../repositories/entretien.repository.sql';
import { CreateMaintenanceRuleDTO, UpdateMaintenanceRuleDTO } from '@application/dtos/MaintenanceRuleDTO';
import { PlanifierEntretienDTO } from '@application/dtos/MaintenancePlanningDTO';
import { PieceSQLRepository } from '../repositories/piece.repository.sql';
import { EntretienPieceSQLRepository } from '../repositories/entretienPiece.repository.sql';
import { UserRepositorySQL } from '../repositories/user.repository.sql';

export class MaintenanceRuleController {
  private maintenanceRuleCrudUseCase: MaintenanceRuleCrudUseCase;
  private planifierEntretienUseCase: PlanifierEntretienUseCase;

  constructor() {
    const maintenanceRuleRepository = new MaintenanceRuleSQLRepository();
    const motoRepository = new SqlMotoRepository();
    const entretienRepository = new EntretienSQLRepository();
    const pieceRepository = new PieceSQLRepository();
    const entretienPiece = new EntretienPieceSQLRepository();
    const userRepository = new UserRepositorySQL();


    this.maintenanceRuleCrudUseCase = new MaintenanceRuleCrudUseCase(maintenanceRuleRepository);
    this.planifierEntretienUseCase = new PlanifierEntretienUseCase(
      maintenanceRuleRepository,
      motoRepository,
      entretienRepository,
      pieceRepository,
      entretienPiece,
      userRepository
    );
  }

  async createMaintenanceRule(req: Request, res: Response): Promise<void> {
    try {
      const ruleDTO: CreateMaintenanceRuleDTO = req.body;
      const rule = await this.maintenanceRuleCrudUseCase.createRule(ruleDTO);
      res.status(201).json(rule);
    } catch (error: any) {
      res.status(400).json({ 
        error: error.message || "Erreur lors de la création de la règle de maintenance" 
      });
    }
  }

  async getAllRules(req: Request, res: Response): Promise<void> {
    try {
      const rules = await this.maintenanceRuleCrudUseCase.getAllRules();
      res.json(rules);
    } catch (error: any) {
      res.status(400).json({ 
        error: error.message || "Erreur lors de la récupération des règles" 
      });
    }
  }

  async updateMaintenanceRule(req: Request, res: Response): Promise<void> {
    try {
      const updateDTO: UpdateMaintenanceRuleDTO = {
        ruleId: req.params.id,
        ...req.body
      };
      const rule = await this.maintenanceRuleCrudUseCase.updateRule(updateDTO);
      if (!rule) {
        res.status(404).json({ error: "Règle de maintenance non trouvée" });
        return;
      }
      res.json(rule);
    } catch (error: any) {
      res.status(400).json({ 
        error: error.message || "Erreur lors de la mise à jour de la règle" 
      });
    }
  }

  async deleteMaintenanceRule(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await this.maintenanceRuleCrudUseCase.deleteRule(req.params.id);
      if (!deleted) {
        res.status(404).json({ error: "Règle de maintenance non trouvée" });
        return;
      }
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ 
        error: error.message || "Erreur lors de la suppression de la règle" 
      });
    }
  }

  async planifierEntretien(req: Request, res: Response): Promise<void> {
    try {
      const planificationDTO: PlanifierEntretienDTO = req.body;
      const result = await this.planifierEntretienUseCase.planifier(planificationDTO);
      res.status(201).json(result);
    } catch (error: any) {
      if (error.message.includes('Stock insuffisant')) {
        res.status(400).json({ 
          error: error.message,
          type: 'STOCK_INSUFFISANT'
        });
        return;
      }
      res.status(400).json({ 
        error: error.message || "Erreur lors de la planification de l'entretien" 
      });
    }
  }
}