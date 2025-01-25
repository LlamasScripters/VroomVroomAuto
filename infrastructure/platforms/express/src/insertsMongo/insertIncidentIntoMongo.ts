import "../modelsSQL/associations";
import IncidentMongo from "../modelsMongo/incident.mongo";
import Incident from "../modelsSQL/incident.sql";
import { IncidentSQL } from "../interfaces/modelsSQL.interface";

async function insertOrUpdateIncidentInMongo(incidentSQL: IncidentSQL): Promise<void> {
    const incidentMongo = await IncidentMongo.findById(incidentSQL.incidentId).exec();

    const newIncident: { [key: string]: any } = {
        _id: incidentSQL.incidentId,
        essai: {
            _id: incidentSQL.essaiId,
        },
        typeIncident: incidentSQL.typeIncident,
        description: incidentSQL.description,
        dateIncident: incidentSQL.dateIncident,
        gravite: incidentSQL.gravite,
    };

    if (incidentMongo) {
        const isSame = Object.keys(newIncident).every(key => 
            JSON.stringify(newIncident[key]) === JSON.stringify((incidentMongo as { [key: string]: any })[key])
        );

        if (!isSame) {
            await IncidentMongo.findByIdAndUpdate(incidentSQL.incidentId, newIncident).exec();
        }
    } else {
        await IncidentMongo.create(newIncident);
    }
}

async function insertIncidentToMongo(): Promise<void> {
    const incidents = await Incident.findAll();

    for (const incident of incidents) {
        await insertOrUpdateIncidentInMongo(incident as unknown as IncidentSQL);
    }
}

export default insertIncidentToMongo;
