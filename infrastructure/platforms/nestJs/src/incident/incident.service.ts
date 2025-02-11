// src/incident/incident.service.ts
import { Injectable } from '@nestjs/common';
import IncidentSQL from '../modelsSQL/incident.sql';

@Injectable()
export class IncidentService {
  // Liste tous les incidents
  async findAll() {
    return IncidentSQL.findAll();
  }

  // Trouver un incident par son ID
  async findById(id: string) {
    return IncidentSQL.findByPk(id);
  }

  // Créer un incident
  async create(data: any) {
    return IncidentSQL.create(data);
  }

  // Exemple de “payer” l’incident
  // (à adapter selon la logique que vous voulez)
  async payIncident(id: string) {
    const incident = await IncidentSQL.findByPk(id);
    if (!incident) {
      throw new Error(`Incident ${id} introuvable`);
    }
    // On pourrait ajouter un champ "status" pour marquer un incident comme "payé"
    // Par exemple :
    // await incident.update({ status: 'paid' });
    // Pour l'instant on retourne juste un message
    return { message: `Incident ${id} has been paid (fictive logic).` };
  }
}
