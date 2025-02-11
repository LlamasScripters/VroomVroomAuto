// src/modelsSQL/incident.sql.ts
import { DataTypes } from 'sequelize';
import { connection } from './database';

const IncidentSQL = connection.define('Incident', {
  incidentId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  essaiId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  typeIncident: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateIncident: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  gravite: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Incidents',
});

export default IncidentSQL;
