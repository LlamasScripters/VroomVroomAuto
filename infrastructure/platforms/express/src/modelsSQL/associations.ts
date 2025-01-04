import UserSQL from './user.sql';
import ClientSQL from './client.sql';
import MotoSQL from './moto.sql';
import EntretienSQL from './entretien.sql';
import PieceSQL from './piece.sql';
import CommandeSQL from './commande.sql';
import ConducteurSQL from './conducteur.sql';
import EssaiSQL from './essaie.sql';
import IncidentSQL from './incident.sql';
import PanneSQL from './panne.sql';
import ReparationSQL from './reparation.sql';

// User associations
UserSQL.hasMany(ClientSQL, { foreignKey: 'userId' });
ClientSQL.belongsTo(UserSQL, { foreignKey: 'userId' });

UserSQL.hasMany(CommandeSQL, { foreignKey: 'userId' });
CommandeSQL.belongsTo(UserSQL, { foreignKey: 'userId' });

UserSQL.hasMany(EntretienSQL, { foreignKey: 'userId' });
EntretienSQL.belongsTo(UserSQL, { foreignKey: 'userId' });

UserSQL.hasMany(ConducteurSQL, { foreignKey: 'userId' });
ConducteurSQL.belongsTo(UserSQL, { foreignKey: 'userId' });

// Client associations
ClientSQL.hasMany(MotoSQL, { foreignKey: 'clientId' });
MotoSQL.belongsTo(ClientSQL, { foreignKey: 'clientId' });

// Moto associations
MotoSQL.hasMany(EntretienSQL, { foreignKey: 'motoId' });
EntretienSQL.belongsTo(MotoSQL, { foreignKey: 'motoId' });

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