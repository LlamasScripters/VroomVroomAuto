import "../modelsSQL/associations";
import PanneMongo from "../modelsMongo/panne.mongo";
import Panne from "../modelsSQL/panne.sql";
import { PanneSQL } from "../interfaces/modelsSQL.interface";

async function insertOrUpdatePanneInMongo(panneSQL: PanneSQL): Promise<void> {
    const panneMongo = await PanneMongo.findById(panneSQL.panneId).exec();

    const newPanne: { [key: string]: any } = {
        _id: panneSQL.panneId,
        moto: {
            _id: panneSQL.motoId,
        },
        description: panneSQL.description,
        date: panneSQL.date,
        actionCorrective: panneSQL.actionCorrective,
        status: panneSQL.status,
        user: {
            _id: panneSQL.userId,
        },
    };

    if (panneMongo) {
        const isSame = Object.keys(newPanne).every(key =>
            JSON.stringify(newPanne[key]) === JSON.stringify((panneMongo as { [key: string]: any })[key])
        );

        if (!isSame) {
            await PanneMongo.findByIdAndUpdate(panneSQL.panneId, newPanne).exec();
        }
    } else {
        await PanneMongo.create(newPanne);
    }
}

async function insertPanneToMongo(): Promise<void> {
    const pannes = await Panne.findAll();

    for (const panne of pannes) {
        await insertOrUpdatePanneInMongo(panne as unknown as PanneSQL);
    }
}

export default insertPanneToMongo;
