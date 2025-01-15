// application/repositories/MaintenanceRuleRepository.ts
import { MaintenanceRule } from '@domain/entities/MaintenanceRuleEntity';
import { UUID } from '@domain/value-objects/UUID';

export interface MaintenanceRuleRepository {
  save(rule: MaintenanceRule): Promise<MaintenanceRule>;
  findByModele(modele: string): Promise<MaintenanceRule | null>;
  findAll(): Promise<MaintenanceRule[]>;
  delete(ruleId: UUID): Promise<boolean>;
}