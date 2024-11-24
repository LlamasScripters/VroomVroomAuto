import { DataTypes } from 'sequelize';
import { connection } from './database';

const CommandeSQL = connection.define('Commande', {
  commandeId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  dateCommande: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  pieceId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  quantiteCommandee: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  coutTotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  dateLivraison: {
    type: DataTypes.DATE,
  },
  statutCommande: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  tableName: 'Commandes',
});
export default CommandeSQL;
