// incident.repository.sql.ts
import { IncidentRepository } from '../../../../../application/repositories/IncidentRepository';
import { Incident } from '../../../../../domain/entities/IncidentEntity';
import { UUID } from '../../../../../domain/value-objects/UUID';
import IncidentSQL from '../modelsSQL/incident.sql';
import { Model } from 'sequelize';


interface IncidentModel extends Model {
    incidentId: string;
    essaiId: string;
    typeIncident: string;
    description: string;
    dateIncident: Date;
    gravite: string;
}

export class IncidentSQLRepository implements IncidentRepository {

    async save(incident: Incident): Promise<Incident> {
        try {
            const createdIncident = await IncidentSQL.create({
                incidentId: incident.incidentId.toString(),
                essaiId: incident.essaiId.toString(),
                typeIncident: incident.typeIncident,
                description: incident.description,
                dateIncident: incident.dateIncident,
                gravite: incident.gravite
            });

            return this.toDomain(createdIncident as IncidentModel);
        } catch (error) {
            throw new Error(`Erreur lors de la sauvegarde de l'incident: ${error}`);
        }
    }

    async findById(incidentId: UUID): Promise<Incident | null> {
        const incident = await IncidentSQL.findByPk(incidentId.toString()) as IncidentModel | null;
        if (!incident) return null;

        return this.toDomain(incident);
    }

    async findAll(): Promise<Incident[]> {
        const incidents = await IncidentSQL.findAll() as IncidentModel[];

        return incidents.map(incident => {
            return this.toDomain(incident);
        });
    }

    async delete(incidentId: UUID): Promise<boolean> {
        const deleted = await IncidentSQL.destroy({
            where: { incidentId: incidentId.toString() }
        });
        return deleted > 0;
    }

    async update(incident: Incident): Promise<Incident> {
        const updateData = {
          essaiId: incident.essaiId.toString(),
          typeIncident: incident.typeIncident,
          description: incident.description,
          dateIncident: incident.dateIncident,
          gravite: incident.gravite
        };
      
        await IncidentSQL.update(updateData, {
          where: { incidentId: incident.incidentId.toString() },
          returning: true
        });
      
        const updatedIncident = await IncidentSQL.findByPk(incident.incidentId.toString()) as IncidentModel;
        if (!updatedIncident) throw new Error('Incident introuvable');
      
        return this.toDomain(updatedIncident);
      }

    private toDomain(model: IncidentModel): Incident {
        return Incident.create(
            new UUID(model.incidentId),
            new UUID(model.essaiId),
            model.typeIncident,
            model.description,
            model.dateIncident,
            model.gravite
        );
    }

}