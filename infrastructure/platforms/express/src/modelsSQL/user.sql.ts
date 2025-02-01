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
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
    validate: {
      isIn: [['admin', 'user', 'gestionnaire']],
    },
    set(value: string) {
      if (typeof value !== 'string') {
        this.setDataValue('role', 'user');
      } else {
        this.setDataValue('role', value.toLowerCase());
      }
    }
  },
  isValidated: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  dateCreation: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  derniereConnexion: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'Users',
});

export default UserSQL;