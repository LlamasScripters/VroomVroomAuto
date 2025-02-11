// infrastructure/platforms/express/src/modelsSQL/commande.sql.ts
import { DataTypes } from 'sequelize';
import { connection } from './database';

const CommandeSQL = connection.define('Commande', {
  commandeId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  pieceId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'PiecesFournisseur',
      key: 'pieceId'
    }
  },
  quantiteCommandee: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  coutTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  dateCommande: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  dateLivraisonPrevue: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  statut: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'EN_ATTENTE',
    validate: {
      isIn: [['EN_ATTENTE', 'EN_COURS', 'LIVREE', 'ANNULEE']]
    }
  },
  gestionnaireid: {
    type: DataTypes.UUID,
    allowNull: false,
  }
}, {
  tableName: 'Commandes',
});

export default CommandeSQL;