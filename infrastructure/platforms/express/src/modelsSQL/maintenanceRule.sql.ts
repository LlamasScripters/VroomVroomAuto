// infrastructure/platforms/express/src/modelsSql/maintenanceRule.sql.ts
import { DataTypes } from 'sequelize';
import { connection } from './database';
import { MaintenanceRuleModel } from '../interfaces/maintenanceRule.interface';

const MaintenanceRuleSQL = connection.define<MaintenanceRuleModel>('MaintenanceRule', {
  ruleId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  modele: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  intervalleKilometrage: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  intervalleTemps: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  typeEntretien: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'MaintenanceRules',
});

export default MaintenanceRuleSQL;