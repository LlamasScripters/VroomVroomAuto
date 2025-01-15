import { DataTypes } from 'sequelize';
import { connection } from './database';

const MotoSQL = connection.define('Moto', {
  motoId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  marque: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  kilometrage: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  dateMiseEnService: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  statut: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  serialNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  clientId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  tableName: 'Motos',
});
export default MotoSQL;