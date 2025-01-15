// application/usecases/maintenance/PlanificationEntretienUseCase.ts
import { MaintenanceRule } from '../../../domain/entities/MaintenanceRuleEntity';
import { Entretien } from '../../../domain/entities/EntretienEntity';
import { MaintenanceRuleRepository } from '../../repositories/MaintenanceRuleRepository';
import { EntretienRepository } from '../../repositories/EntretienRepository';
import { UUID } from '../../../domain/value-objects/UUID';

export class PlanificationEntretienUseCase {
  constructor(
    private maintenanceRuleRepository: MaintenanceRuleRepository,
    private entretienRepository: EntretienRepository
  ) {}

  async createMaintenanceRule(
    modele: string,
    intervalleKilometrage: number,
    intervalleTemps: number,
    typeEntretien: string
  ): Promise<MaintenanceRule> {
    const rule = MaintenanceRule.create(
      new UUID(),
      modele,
      intervalleKilometrage,
      intervalleTemps,
      typeEntretien
    );
    return this.maintenanceRuleRepository.save(rule);
  }

  async planifierEntretien(
    motoId: UUID,
    modele: string,
    kilometrageActuel: number,
    lastMaintenanceKm: number,
    lastMaintenanceDate: Date
  ): Promise<Entretien | null> {
    const rule = await this.maintenanceRuleRepository.findByModele(modele);
    if (!rule) {
      throw new Error(`Aucune règle de maintenance trouvée pour le modèle ${modele}`);
    }

    if (rule.needsMaintenance(kilometrageActuel, lastMaintenanceKm, lastMaintenanceDate)) {
      const datePrevue = new Date();
      datePrevue.setDate(datePrevue.getDate() + 7); // Planifie pour dans une semaine

      return this.entretienRepository.save(
        Entretien.create(
          new UUID(),
          motoId,
          rule.typeEntretien,
          datePrevue,
          new Date(),
          kilometrageActuel,
          "",
          "",
          0,
          "PLANIFIÉ",
          new UUID() // userId à gérer avec l'authentification
        )
      );
    }

    return null;
  }
}