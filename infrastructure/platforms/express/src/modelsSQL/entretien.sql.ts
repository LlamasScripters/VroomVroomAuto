import { DataTypes } from 'sequelize';
import { connection } from './database';

const EntretienSQL = connection.define('Entretien', {
  entretienId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  motoId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  typeEntretien: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  datePrevue: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  dateRealisee: {
    type: DataTypes.DATE,
  },
  kilometrageEntretien: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  recommandationsTechnicien: {
    type: DataTypes.STRING,
  },
  recommandationsGestionnaireClient: {
    type: DataTypes.STRING,
  },
  cout: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  statut: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  tableName: 'Entretiens',
});
export default EntretienSQL;