import "../modelsSQL/associations";
import ReparationMongo from "../modelsMongo/reparation.mongo";
import Reparation from "../modelsSQL/reparation.sql";
import { ReparationSQL } from "../interfaces/modelsSQL.interface";

async function insertOrUpdateReparationInMongo(reparationSQL: ReparationSQL): Promise<void> {
    const reparationMongo = await ReparationMongo.findById(reparationSQL.reparationId).exec();

    const newReparation: { [key: string]: any } = {
        _id: reparationSQL.reparationId,
        panne: {
            _id: reparationSQL.panneId,
        },
        description: reparationSQL.description,
        dateReparation: reparationSQL.dateReparation,
        actionsCorrectives: reparationSQL.actionsCorrectives,
        coutReparation: reparationSQL.coutReparation,
        status: reparationSQL.status,
        user: {
            _id: reparationSQL.userId,
        },
    };

    if (reparationMongo) {
        const isSame = Object.keys(newReparation).every(key =>
            JSON.stringify(newReparation[key]) === JSON.stringify((reparationMongo as { [key: string]: any })[key])
        );

        if (!isSame) {
            await ReparationMongo.findByIdAndUpdate(reparationSQL.reparationId, newReparation).exec();
        }
    } else {
        await ReparationMongo.create(newReparation);
    }
}

async function insertReparationToMongo(): Promise<void> {
    const reparations = await Reparation.findAll();

    for (const reparation of reparations) {
        await insertOrUpdateReparationInMongo(reparation as unknown as ReparationSQL);
    }
}

export default insertReparationToMongo;
