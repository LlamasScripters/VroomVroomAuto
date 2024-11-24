import { DataTypes } from 'sequelize';
import { connection } from './database';

const UserSQL = connection.define('User', {
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  motDePasse: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateCreation: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  derniereConnexion: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'Users',
});
export default UserSQL;