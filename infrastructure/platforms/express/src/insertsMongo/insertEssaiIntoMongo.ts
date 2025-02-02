import "../modelsSQL/associations";
import EssaiMongo from "../modelsMongo/essaie.mongo"; 
import Essai from "../modelsSQL/essaie.sql";
import { EssaiSQL } from "../interfaces/modelsSQL.interface";

async function insertOrUpdateEssaiInMongo(essaiSQL: EssaiSQL): Promise<void> {
    const essaiMongo = await EssaiMongo.findById(essaiSQL.essaiId).exec();

    const newEssai: { [key: string]: any } = {
        _id: essaiSQL.essaiId,
        moto: {
            _id: essaiSQL.motoId,
        },
        conducteur: {
            _id: essaiSQL.conducteurId,
        },
        dateDebut: essaiSQL.dateDebut,
        dateFin: essaiSQL.dateFin,
        duree: essaiSQL.duree,
        user: {
            _id: essaiSQL.userId,
        },
    };

    if (essaiMongo) {
        const isSame = Object.keys(newEssai).every(key => 
            JSON.stringify(newEssai[key]) === JSON.stringify((essaiMongo as { [key: string]: any })[key])
        );

        if (!isSame) {
            await EssaiMongo.findByIdAndUpdate(essaiSQL.essaiId, newEssai).exec();
        }
    } else {
        await EssaiMongo.create(newEssai);
    }
}

async function insertEssaiToMongo(): Promise<void> {
    const essais = await Essai.findAll();

    for (const essai of essais) {
        await insertOrUpdateEssaiInMongo(essai as unknown as EssaiSQL);
    }
}

export default insertEssaiToMongo;
