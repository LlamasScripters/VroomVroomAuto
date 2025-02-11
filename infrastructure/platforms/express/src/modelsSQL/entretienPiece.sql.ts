// infrastructure/platforms/express/src/modelsSQL/entretienPiece.sql.ts
import { DataTypes } from 'sequelize';
import { connection } from './database';

const EntretienPieceSQL = connection.define('EntretienPiece', {
  entretienPieceId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  entretienId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Entretiens',
      key: 'entretienId'
    }
  },
  pieceId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Pieces',
      key: 'pieceId'
    }
  },
  quantite: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  prixUnitaire: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  }
}, {
  tableName: 'EntretiensPieces',
});

export default EntretienPieceSQL;