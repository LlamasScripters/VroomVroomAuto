// infrastructure/platforms/express/src/controllers/entretienController.ts
import { Request, Response } from 'express';
import { PlanificationEntretienUseCase } from '@application/usecases/maintenance/PlanificationEntretienUseCase';
import { EntretienRepository } from '@application/repositories/EntretienRepository';
import { MaintenanceRuleRepository } from '@application/repositories/MaintenanceRuleRepository';
import { EntretienSQLRepository } from '../repositories/entretien.repository.sql';
import { MaintenanceRuleSQLRepository } from '../repositories/maintenanceRule.repository.sql';
import { UUID } from '@domain/value-objects/UUID';

export class EntretienController {
  private planificationUseCase: PlanificationEntretienUseCase;
  
  constructor() {
    const entretienRepository: EntretienRepository = new EntretienSQLRepository();
    const maintenanceRuleRepository: MaintenanceRuleRepository = new MaintenanceRuleSQLRepository();
    this.planificationUseCase = new PlanificationEntretienUseCase(
      maintenanceRuleRepository,
      entretienRepository
    );
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

      // Validation des données
      if (!motoId || !modele || kilometrageActuel === undefined || 
          lastMaintenanceKm === undefined || !lastMaintenanceDate) {
        res.status(400).json({ 
          message: "Données manquantes pour la planification de l'entretien" 
        });
        return;
      }

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
        res.status(200).json({ 
          message: "Aucun entretien nécessaire pour le moment" 
        });
      }
    } catch (error: any) {
      if (error.message.includes("Aucune règle de maintenance trouvée")) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ 
          message: error.message || "Erreur lors de la planification de l'entretien" 
        });
      }
    }
  }

  async getAllEntretiens(req: Request, res: Response): Promise<void> {
    try {
      const entretienRepository = new EntretienSQLRepository();
      const entretiens = await entretienRepository.findAll();
      res.status(200).json(entretiens);
    } catch (error: any) {
      res.status(500).json({ 
        message: error.message || "Erreur lors de la récupération des entretiens" 
      });
    }
  }

  async getEntretienById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const entretienRepository = new EntretienSQLRepository();
      const entretien = await entretienRepository.findById(new UUID(id));
      
      if (entretien) {
        res.status(200).json(entretien);
      } else {
        res.status(404).json({ message: "Entretien non trouvé" });
      }
    } catch (error: any) {
      res.status(500).json({ 
        message: error.message || "Erreur lors de la récupération de l'entretien" 
      });
    }
  }

  async updateEntretien(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const entretienData = req.body;
      const entretienRepository = new EntretienSQLRepository();
      
      const existingEntretien = await entretienRepository.findById(new UUID(id));
      if (!existingEntretien) {
        res.status(404).json({ message: "Entretien non trouvé" });
        return;
      }

      const updatedEntretien = await entretienRepository.update({
        ...existingEntretien,
        ...entretienData
      });

      res.status(200).json(updatedEntretien);
    } catch (error: any) {
      res.status(500).json({ 
        message: error.message || "Erreur lors de la mise à jour de l'entretien" 
      });
    }
  }
}