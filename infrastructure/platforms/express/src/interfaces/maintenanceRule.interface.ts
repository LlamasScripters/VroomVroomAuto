// infrastructure/platforms/express/src/modelsSql/interfaces/maintenanceRule.interface.ts
import { Model } from 'sequelize';

export interface MaintenanceRuleAttributes {
  ruleId: string;
  modele: string;
  intervalleKilometrage: number;
  intervalleTemps: number;
  typeEntretien: string;
}

export interface MaintenanceRuleModel extends Model<MaintenanceRuleAttributes>, MaintenanceRuleAttributes {}