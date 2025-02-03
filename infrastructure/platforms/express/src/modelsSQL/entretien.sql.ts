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
    references:{
      model: 'Motos',
      key: 'motoId'
    }
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
    allowNull: true,
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
  coutMainOeuvre: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  coutPieces: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  coutTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  statut: {
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false, 
    references: {
      model: 'Users',
      key: 'userId'
    }
  },
  
  gestionnaireId: {
    type: DataTypes.UUID,
    allowNull: false, 
    references: {
      model: 'Users',
      key: 'userId'
    }
  },

}, {
  tableName: 'Entretiens',
});

export default EntretienSQL;
