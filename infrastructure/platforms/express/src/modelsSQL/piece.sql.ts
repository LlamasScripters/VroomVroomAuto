import { DataTypes } from 'sequelize';
import { connection } from './database';

const PieceSQL = connection.define('Piece', {
  pieceId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reference: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantiteEnStock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  seuilCritique: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categorie: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fournisseur: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  prixUnitaire: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
}, {
  tableName: 'Pieces',
});
export default PieceSQL;