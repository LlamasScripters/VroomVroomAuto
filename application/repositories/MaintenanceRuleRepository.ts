// application/repositories/MaintenanceRuleRepository.ts
import { MaintenanceRule } from '../../domain/entities/MaintenanceRuleEntity';
import { UUID } from '../../domain/value-objects/UUID';

export interface MaintenanceRuleRepository {
  save(rule: MaintenanceRule): Promise<MaintenanceRule>;
  findById(ruleId: UUID): Promise<MaintenanceRule | null>;
  findByModele(modele: string): Promise<MaintenanceRule | null>;
  update(rule: MaintenanceRule): Promise<MaintenanceRule>;
  delete(ruleId: UUID): Promise<boolean>;
  findAll(): Promise<MaintenanceRule[]>;
}