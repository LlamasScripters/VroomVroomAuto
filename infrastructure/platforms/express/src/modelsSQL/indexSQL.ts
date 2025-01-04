import { connection } from './database';
import UserSQL from './user.sql';
import ClientSQL from './client.sql';
import MotoSQL from './moto.sql';
import EntretienSQL from './entretien.sql';
import PieceSQL from './piece.sql';
import CommandeSQL from './commande.sql';
import ConducteurSQL from './conducteur.sql';
import EssaiSQL from './essaie.sql';
import IncidentSQL from './incident.sql';
import ReparationSQL from './reparation.sql';
import PanneSQL from './panne.sql';

const db = {
  connection,
  UserSQL,
  ClientSQL,
  MotoSQL,
  EntretienSQL,
  PieceSQL,
  CommandeSQL,
  ConducteurSQL,
  EssaiSQL,
  IncidentSQL,
  ReparationSQL,
  PanneSQL,
};

export default db;
