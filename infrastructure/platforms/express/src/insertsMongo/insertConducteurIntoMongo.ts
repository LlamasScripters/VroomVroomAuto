import "../modelsSQL/associations";
import ConducteurMongo from "../modelsMongo/conducteur.mongo";
import Conducteur from "../modelsSQL/conducteur.sql";
import { ConducteurSQL } from "../interfaces/modelsSQL.interface";

async function insertOrUpdateConducteurInMongo(conducteurSQL: ConducteurSQL): Promise<void> {
    const conducteurMongo = await ConducteurMongo.findById(conducteurSQL.conducteurId).exec();

    const newConducteur: { [key: string]: any } = {
        _id: conducteurSQL.conducteurId,
        nom: conducteurSQL.nom,
        prenom: conducteurSQL.prenom,
        dateNaissance: conducteurSQL.dateNaissance,
        numeroPermis: conducteurSQL.numeroPermis,
        categoriePermis: conducteurSQL.categoriePermis,
        dateObtentionPermis: conducteurSQL.dateObtentionPermis,
        dateValiditePermis: conducteurSQL.dateValiditePermis,
        anneeExperience: conducteurSQL.anneeExperience,
        telephone: conducteurSQL.telephone,
        email: conducteurSQL.email,
        disponibilite: conducteurSQL.disponibilite,
        statut: conducteurSQL.statut,
        user: {
            _id: conducteurSQL.userId
        },
        dateCreation: conducteurSQL.dateCreation,
        derniereModification: conducteurSQL.derniereModification
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
