import { DataTypes } from 'sequelize';
import { connection } from './database';

const PanneSQL = connection.define('Panne', {
  panneId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  motoId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  actionCorrective: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'à traiter',
    validate: {
      isIn: [['à traiter', 'en cours de traitement', 'traitée']],
    },
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
}, {
  tableName: 'Pannes',
});

export default PanneSQL;
