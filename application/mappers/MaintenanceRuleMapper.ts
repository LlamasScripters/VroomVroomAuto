// application/mappers/MaintenanceRuleMapper.ts

import { MaintenanceRule } from '@domain/entities/MaintenanceRuleEntity';
import { UUID } from '@domain/value-objects/UUID';
import { MaintenanceRuleDTO } from '@application/dtos/MaintenanceRuleDTO';

export class MaintenanceRuleMapper {
  public static toDTO(entity: MaintenanceRule): MaintenanceRuleDTO {
    return {
      ruleId: entity.ruleId.toString(),
      modele: entity.modele,
      intervalleKilometrage: entity.intervalleKilometrage,
      intervalleTemps: entity.intervalleTemps,
      typeEntretien: entity.typeEntretien,
      nombreEntretiensPrevus: entity.nombreEntretiensPrevus,
      dateDernierEntretien: entity.dateDernierEntretien?.toISOString()
    };
  }

  public static toDomain(dto: MaintenanceRuleDTO): MaintenanceRule {
    return MaintenanceRule.create(
      new UUID(dto.ruleId),
      dto.modele,
      dto.intervalleKilometrage,
      dto.intervalleTemps,
      dto.typeEntretien,
      dto.nombreEntretiensPrevus,
      dto.dateDernierEntretien ? new Date(dto.dateDernierEntretien) : undefined
    );
  }
}