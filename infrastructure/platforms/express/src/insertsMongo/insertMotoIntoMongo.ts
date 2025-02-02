import "../modelsSQL/associations";
import MotoMongo from "../modelsMongo/moto.mongo";
import Moto from "../modelsSQL/moto.sql";
import { MotoSQL } from "../interfaces/modelsSQL.interface";

async function insertOrUpdateMotoInMongo(motoSQL: MotoSQL): Promise<void> {
    const motoMongo = await MotoMongo.findById(motoSQL.motoId).exec();

    const newMoto: { [key: string]: any } = {
        _id: motoSQL.motoId,
        marque: motoSQL.marque,
        model: motoSQL.model,
        kilometrage: motoSQL.kilometrage,
        dateMiseEnService: motoSQL.dateMiseEnService,
        statut: motoSQL.statut,
        serialNumber: motoSQL.serialNumber,
        user: {
            _id: motoSQL.userId
        }
    };

    if (motoMongo) {
        const isSame = Object.keys(newMoto).every(key => 
            JSON.stringify(newMoto[key]) === JSON.stringify((motoMongo as { [key: string]: any })[key])
        );

        if (!isSame) {
            await MotoMongo.findByIdAndUpdate(motoSQL.motoId, newMoto).exec();
        }
    } else {
        await MotoMongo.create(newMoto);
    }
}

async function insertMotoToMongo(): Promise<void> {
    const motos = await Moto.findAll();

    for (const moto of motos) {
        await insertOrUpdateMotoInMongo(moto as unknown as MotoSQL);
    }
}

export default insertMotoToMongo;
