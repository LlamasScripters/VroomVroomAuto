// infrastructure/platforms/express/src/controllers/maintenanceRuleController.ts
import { Request, Response } from 'express';
import { PlanificationEntretienUseCase } from '@application/usecases/maintenance/PlanificationEntretienUseCase';
import { MaintenanceRuleSQLRepository } from '../repositories/maintenanceRule.repository.sql';
import { EntretienSQLRepository } from '../repositories/entretien.repository.sql';
import { UUID } from '../../../../../domain/value-objects/UUID';

export class MaintenanceRuleController {
  private planificationUseCase: PlanificationEntretienUseCase;

  constructor() {
    const maintenanceRuleRepo = new MaintenanceRuleSQLRepository();
    const entretienRepo = new EntretienSQLRepository();
    this.planificationUseCase = new PlanificationEntretienUseCase(
      maintenanceRuleRepo,
      entretienRepo
    );
  }

  async createMaintenanceRule(req: Request, res: Response): Promise<void> {
    try {
      const { modele, intervalleKilometrage, intervalleTemps, typeEntretien } = req.body;
      
      const rule = await this.planificationUseCase.createMaintenanceRule(
        modele,
        intervalleKilometrage,
        intervalleTemps,
        typeEntretien
      );
      
      res.status(201).json(rule);
    } catch (error: any) { 
      res.status(400).json({ 
        message: error?.message || "Une erreur est survenue" 
      });
    }
  }

  async planifierEntretien(req: Request, res: Response): Promise<void> {
    try {
      const {
        motoId,
        modele,
        kilometrageActuel,
        lastMaintenanceKm,
        lastMaintenanceDate
      } = req.body;

      const entretien = await this.planificationUseCase.planifierEntretien(
        new UUID(motoId),
        modele,
        kilometrageActuel,
        lastMaintenanceKm,
        new Date(lastMaintenanceDate)
      );

      if (entretien) {
        res.status(201).json(entretien);
      } else {
        res.status(200).json({ message: "Aucun entretien nécessaire pour le moment" });
      }
    } catch (error: any) {
      res.status(400).json({ 
        message: error?.message || "Une erreur est survenue" 
      });
    }
  }
}