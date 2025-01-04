import { DataTypes } from 'sequelize';
import { connection } from './database';

const ReparationSQL = connection.define('Reparation', {
  reparationId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  panneId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateReparation: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  actionsCorrectives: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  coutReparation: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  tableName: 'Reparations',
});

export default ReparationSQL;
