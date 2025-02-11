// infrastructure/platforms/express/modelsSQL/pieceFournisseur.sql.ts
import { DataTypes } from 'sequelize';
import { connection } from './database';

const PieceFournisseurSQL = connection.define('PieceFournisseur', {
    pieceId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    reference: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    categorie: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['Filtration', 'Freinage', 'Pneumatiques', 'Moteur', 'Transmission', 'Electrique', 'Carrosserie', 'Autres']]
        }
    },
    prixUnitaire: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    quantiteEnStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    seuilCritique: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    fournisseur: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Triumph Motorcycles'
    }
}, {
    tableName: 'PiecesFournisseur',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['reference']
        },
        {
            fields: ['categorie']
        }
    ]
});

export default PieceFournisseurSQL;