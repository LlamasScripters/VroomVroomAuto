// application/usecases/maintenance/MaintenanceRuleCrudUseCase.ts

import { MaintenanceRule } from '@domain/entities/MaintenanceRuleEntity';
import { MaintenanceRuleRepository } from '@application/repositories/MaintenanceRuleRepository';
import { UUID } from '@domain/value-objects/UUID';
import { 
  CreateMaintenanceRuleDTO, 
  UpdateMaintenanceRuleDTO, 
  MaintenanceRuleDTO,
  GetMaintenanceRuleDTO 
} from '@application/dtos/MaintenanceRuleDTO';
import { MaintenanceRuleMapper } from '@application/mappers/MaintenanceRuleMapper';

export class MaintenanceRuleCrudUseCase {
  constructor(
    private maintenanceRuleRepository: MaintenanceRuleRepository
  ) {}

  async createRule(dto: CreateMaintenanceRuleDTO): Promise<MaintenanceRuleDTO> {
    const rule = MaintenanceRule.create(
      new UUID(),
      dto.modele,
      dto.intervalleKilometrage,
      dto.intervalleTemps,
      dto.typeEntretien
    );

    try {
      const savedRule = await this.maintenanceRuleRepository.save(rule);
      return MaintenanceRuleMapper.toDTO(savedRule);
    } catch (error) {
      throw new Error(`Erreur lors de la création de la règle: ${error}`);
    }
  }

  async getRule(dto: GetMaintenanceRuleDTO): Promise<MaintenanceRuleDTO | null> {
    const ruleId = new UUID(dto.ruleId);
    const rule = await this.maintenanceRuleRepository.findById(ruleId);
    
    if (!rule) return null;
    return MaintenanceRuleMapper.toDTO(rule);
  }

  async getRuleByModele(modele: string): Promise<MaintenanceRuleDTO | null> {
    const rule = await this.maintenanceRuleRepository.findByModele(modele);
    
    if (!rule) return null;
    return MaintenanceRuleMapper.toDTO(rule);
  }

  async updateRule(dto: UpdateMaintenanceRuleDTO): Promise<MaintenanceRuleDTO | null> {
    const existingRule = await this.maintenanceRuleRepository.findById(new UUID(dto.ruleId));
    if (!existingRule) return null;

    const updatedRule = MaintenanceRule.create(
      existingRule.ruleId,
      dto.modele ?? existingRule.modele,
      dto.intervalleKilometrage ?? existingRule.intervalleKilometrage,
      dto.intervalleTemps ?? existingRule.intervalleTemps,
      dto.typeEntretien ?? existingRule.typeEntretien
    );

    const savedRule = await this.maintenanceRuleRepository.update(updatedRule);
    return MaintenanceRuleMapper.toDTO(savedRule);
  }

  async getAllRules(): Promise<MaintenanceRuleDTO[]> {
    const rules = await this.maintenanceRuleRepository.findAll();
    return rules.map(rule => MaintenanceRuleMapper.toDTO(rule));
  }

  async deleteRule(ruleId: string): Promise<boolean> {
    return await this.maintenanceRuleRepository.delete(new UUID(ruleId));
  }
}