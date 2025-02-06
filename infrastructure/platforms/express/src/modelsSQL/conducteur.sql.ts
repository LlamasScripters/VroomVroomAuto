// infrastructure/platforms/express/modelsSQL/conducteur.sql.ts
import { DataTypes } from 'sequelize';
import { connection } from './database';

const ConducteurSQL = connection.define('Conducteur', {
    conducteurId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateNaissance: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    numeroPermis: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    categoriePermis: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateObtentionPermis: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    dateValiditePermis: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    anneeExperience: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    disponibilite: {
        type: DataTypes.ENUM('SEMAINE', 'WEEKEND', 'TEMPS_PLEIN'),
        allowNull: false,
    },
    statut: {
        type: DataTypes.ENUM('ACTIF', 'INACTIF', 'SUSPENDU'),
        allowNull: false,
        defaultValue: 'ACTIF'
    },
    userId: { 
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'userId'
        }
    },
    dateCreation: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    derniereModification: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'Conducteurs',
    timestamps: false,
});

export default ConducteurSQL;