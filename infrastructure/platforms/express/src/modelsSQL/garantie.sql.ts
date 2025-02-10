import { DataTypes } from 'sequelize';
import { connection } from './database';

const GarantieSQL = connection.define('Garantie', {
    garantieId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    panneId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    motoId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    couverture: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['Moto', 'Piece', 'Entretien']],
        },
    },
    dateDebut: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    dateFin: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    statut: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['Active', 'Expirée', 'Utilisée']],
        },
    }
}, {
    tableName: 'Garanties',
});
export default GarantieSQL;