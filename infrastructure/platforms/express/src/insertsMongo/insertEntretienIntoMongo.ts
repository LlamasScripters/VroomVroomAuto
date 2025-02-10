import "../modelsSQL/associations";
import EntretienMongo from "../modelsMongo/entretien.mongo";
import Entretien from "../modelsSQL/entretien.sql";
import { EntretienSQL } from "../interfaces/modelsSQL.interface";

async function insertOrUpdateEntretienInMongo(entretienSQL: EntretienSQL): Promise<void> {
    const entretienMongo = await EntretienMongo.findById(entretienSQL.entretienId).exec();

    const newEntretien: { [key: string]: any } = {
        _id: entretienSQL.entretienId,
        moto: {
            _id: entretienSQL.motoId,
        },
        typeEntretien: entretienSQL.typeEntretien,
        datePrevue: entretienSQL.datePrevue,
        dateRealisee: entretienSQL.dateRealisee,
        kilometrageEntretien: entretienSQL.kilometrageEntretien,
        recommandationsTechnicient: entretienSQL.recommandationsTechnicien,
        recommandationsGestionnaireClient: entretienSQL.recommandationsGestionnaireClient,
        cout: entretienSQL.cout,
        statut: entretienSQL.statut,
        user: {
            _id: entretienSQL.userId,
        },
    };

    if (entretienMongo) {
        const isSame = Object.keys(newEntretien).every(key =>
            JSON.stringify(newEntretien[key]) === JSON.stringify((entretienMongo as { [key: string]: any })[key])
        );

        if (!isSame) {
            await EntretienMongo.findByIdAndUpdate(entretienSQL.entretienId, newEntretien).exec();
        }
    } else {
        await EntretienMongo.create(newEntretien);
    }
}

async function insertEntretienToMongo(): Promise<void> {
    const entretiens = await Entretien.findAll();

    for (const entretien of entretiens) {
        await insertOrUpdateEntretienInMongo(entretien as unknown as EntretienSQL);
    }
}

export default insertEntretienToMongo;
