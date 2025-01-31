import { DataTypes } from 'sequelize';
import { connection } from './database';
import bcrypt from 'bcryptjs';


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
      isIn: [['admin', 'user']],
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

// UserSQL.addHook('beforeCreate', async (user: any) => {
//   user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
// });

UserSQL.addHook('beforeUpdate', async (user: any) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
  }
});

export default UserSQL;