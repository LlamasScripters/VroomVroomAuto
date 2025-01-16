// infrastructure/platforms/express/src/repositories/maintenanceRule.repository.sql.ts
import { MaintenanceRuleRepository } from '@application/repositories/MaintenanceRuleRepository';
import { MaintenanceRule } from '../../../../../domain/entities/MaintenanceRuleEntity';
import { UUID } from '../../../../../domain/value-objects/UUID';
import MaintenanceRuleSQL from '../modelsSQL/maintenanceRule.sql';
import { MaintenanceRuleModel } from '../interfaces/maintenanceRule.interface';

export class MaintenanceRuleSQLRepository implements MaintenanceRuleRepository {
  async save(rule: MaintenanceRule): Promise<MaintenanceRule> {
    const [savedRule] = await MaintenanceRuleSQL.upsert({
      ruleId: rule.ruleId.toString(),
      modele: rule.modele,
      intervalleKilometrage: rule.intervalleKilometrage,
      intervalleTemps: rule.intervalleTemps,
      typeEntretien: rule.typeEntretien
    });

    return this.toEntity(savedRule);
  }

  async findByModele(modele: string): Promise<MaintenanceRule | null> {
    const rule = await MaintenanceRuleSQL.findOne({
      where: { modele }
    });

    if (!rule) return null;
    return this.toEntity(rule);
  }

  async findAll(): Promise<MaintenanceRule[]> {
    const rules = await MaintenanceRuleSQL.findAll();
    return rules.map(rule => this.toEntity(rule));
  }

  async delete(ruleId: UUID): Promise<boolean> {
    const deleted = await MaintenanceRuleSQL.destroy({
      where: { ruleId: ruleId.toString() }
    });
    return deleted > 0;
  }

  private toEntity(model: MaintenanceRuleModel): MaintenanceRule {
    return MaintenanceRule.create(
      new UUID(model.ruleId),
      model.modele,
      model.intervalleKilometrage,
      model.intervalleTemps,
      model.typeEntretien
    );
  }
}