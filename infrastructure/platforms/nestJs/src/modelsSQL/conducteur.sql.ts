import { DataTypes } from 'sequelize';
import { connection } from './database';

const ConducteurSQL = connection.define('Conducteur', {
  conducteurId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  permis: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoriePermis: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  experience: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  tableName: 'Conducteurs',
});
export default ConducteurSQL;