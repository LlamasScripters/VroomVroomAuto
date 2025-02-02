import UserSQL from './user.sql';
import MotoSQL from './moto.sql';
import EntretienSQL from './entretien.sql';
import PieceSQL from './piece.sql';
import CommandeSQL from './commande.sql';
import ConducteurSQL from './conducteur.sql';
import EssaiSQL from './essaie.sql';
import IncidentSQL from './incident.sql';
import PanneSQL from './panne.sql';
import ReparationSQL from './reparation.sql';
import MaintenanceRuleSQL from './maintenanceRule.sql';

// User associations 
UserSQL.hasMany(MotoSQL, { foreignKey: 'userId' });
MotoSQL.belongsTo(UserSQL, { foreignKey: 'userId' });

UserSQL.hasMany(CommandeSQL, { foreignKey: 'userId' });
CommandeSQL.belongsTo(UserSQL, { foreignKey: 'userId' });

// UserSQL.hasMany(EntretienSQL, { foreignKey: 'userId' });
// EntretienSQL.belongsTo(UserSQL, { foreignKey: 'userId' });

UserSQL.hasMany(ConducteurSQL, { foreignKey: 'userId' });
ConducteurSQL.belongsTo(UserSQL, { foreignKey: 'userId' });

MaintenanceRuleSQL.hasMany(EntretienSQL, { foreignKey: 'ruleId', as: 'entretiens' });
EntretienSQL.belongsTo(MaintenanceRuleSQL, { foreignKey: 'ruleId', as: 'maintenanceRule' });

MotoSQL.hasOne(MaintenanceRuleSQL, { foreignKey: 'modele', sourceKey: 'model', as: 'maintenanceRule' });
MaintenanceRuleSQL.belongsTo(MotoSQL, { foreignKey: 'modele', targetKey: 'model', as: 'moto' });

// Client associations
// ClientSQL.hasMany(MotoSQL, { foreignKey: { name: 'clientId', allowNull: true }, onDelete: 'SET NULL', onUpdate: 'CASCADE'});
// MotoSQL.belongsTo(ClientSQL, { foreignKey: { name: 'clientId',allowNull: true }});

// Moto associations
MotoSQL.hasMany(EntretienSQL, { foreignKey: 'motoId', as: 'entretiens' });
EntretienSQL.belongsTo(MotoSQL, { foreignKey: 'motoId', as: 'moto' });

MotoSQL.hasMany(EssaiSQL, { foreignKey: 'motoId' });
EssaiSQL.belongsTo(MotoSQL, { foreignKey: 'motoId' });

// Conducteur associations
ConducteurSQL.hasMany(EssaiSQL, { foreignKey: 'conducteurId' });
EssaiSQL.belongsTo(ConducteurSQL, { foreignKey: 'conducteurId' });

// Essai associations
EssaiSQL.hasMany(IncidentSQL, { foreignKey: 'essaiId' });
IncidentSQL.belongsTo(EssaiSQL, { foreignKey: 'essaiId' });

// Pannes associations
MotoSQL.hasMany(PanneSQL, { foreignKey: 'motoId' });
PanneSQL.belongsTo(MotoSQL, { foreignKey: 'motoId' });

UserSQL.hasMany(PanneSQL, { foreignKey: 'userId' });
PanneSQL.belongsTo(UserSQL, { foreignKey: 'userId' });

// Réparations associations
PanneSQL.hasMany(ReparationSQL, { foreignKey: 'panneId' });
ReparationSQL.belongsTo(PanneSQL, { foreignKey: 'panneId' });

UserSQL.hasMany(ReparationSQL, { foreignKey: 'userId' });
ReparationSQL.belongsTo(UserSQL, { foreignKey: 'userId' });