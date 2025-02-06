import { DataTypes } from 'sequelize';
import { connection } from './database';

const EssaiSQL = connection.define('Essai', {
  essaiId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  motoId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  conducteurId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  dateDebut: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  dateFin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  duree: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  tableName: 'Essais',
});
export default EssaiSQL;