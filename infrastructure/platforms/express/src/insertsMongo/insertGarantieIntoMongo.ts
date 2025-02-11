import "../modelsSQL/associations";
import GarantieMongo from "../modelsMongo/garantie.mongo";
import Garantie from "../modelsSQL/garantie.sql";
import { GarantieSQL } from "../interfaces/modelsSQL.interface";

async function insertOrUpdateGarantieInMongo(garantieSQL: GarantieSQL): Promise<void> {
    const garantieMongo = await GarantieMongo.findById(garantieSQL.garantieId).exec();

    const newGarantie: { [key: string]: any } = {
        _id: garantieSQL.garantieId,
        moto: {
            _id: garantieSQL.motoId,
        },
        panne: {
            _id: garantieSQL.panneId,
        },
        couverture: garantieSQL.couverture,
        type: garantieSQL.type,
        dateDebut: garantieSQL.dateDebut,
        dateFin: garantieSQL.dateFin,
        statut: garantieSQL.statut,
    };

    if (garantieMongo) {
        const isSame = Object.keys(newGarantie).every(key =>
            JSON.stringify(newGarantie[key]) === JSON.stringify((garantieMongo as { [key: string]: any })[key])
        );

        if (!isSame) {
            await GarantieMongo.findByIdAndUpdate(garantieSQL.garantieId, newGarantie).exec();
        }
    } else {
        await GarantieMongo.create(newGarantie);
    }
}

async function insertGarantieToMongo(): Promise<void> {
    const garanties = await Garantie.findAll();

    for (const garantie of garanties) {
        await insertOrUpdateGarantieInMongo(garantie as unknown as GarantieSQL);
    }
}

export default insertGarantieToMongo;