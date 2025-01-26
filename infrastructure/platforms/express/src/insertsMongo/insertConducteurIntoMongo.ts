import "../modelsSQL/associations";
import ConducteurMongo from "../modelsMongo/conducteur.mongo";
import Conducteur from "../modelsSQL/conducteur.sql";
import { ConducteurSQL } from "../interfaces/modelsSQL.interface";

async function insertOrUpdateConducteurInMongo(conducteurSQL: ConducteurSQL): Promise<void> {
    const conducteurMongo = await ConducteurMongo.findById(conducteurSQL.conducteurId).exec();

    const newConducteur: { [key: string]: any } = {
        _id: conducteurSQL.conducteurId,
        nom: conducteurSQL.nom,
        permis: conducteurSQL.permis,
        categoriePermis: conducteurSQL.categoriePermis,
        experience: conducteurSQL.experience,
        user: {
            _id: conducteurSQL.userId,
        },
    };

    if (conducteurMongo) {
        const isSame = Object.keys(newConducteur).every(key => 
            JSON.stringify(newConducteur[key]) === JSON.stringify((conducteurMongo as { [key: string]: any })[key])
        );

        if (!isSame) {
            await ConducteurMongo.findByIdAndUpdate(conducteurSQL.conducteurId, newConducteur).exec();
        }
    } else {
        await ConducteurMongo.create(newConducteur);
    }
}

async function insertConducteurToMongo(): Promise<void> {
    const conducteurs = await Conducteur.findAll();

    for (const conducteur of conducteurs) {
        await insertOrUpdateConducteurInMongo(conducteur as unknown as ConducteurSQL);
    }
}

export default insertConducteurToMongo;
