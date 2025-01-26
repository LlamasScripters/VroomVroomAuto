import "../modelsSQL/associations";
import CommandeMongo from "../modelsMongo/commande.mongo";
import Commande from "../modelsSQL/commande.sql";
import { CommandeSQL } from "../interfaces/modelsSQL.interface";

async function insertOrUpdateCommandeInMongo(commandeSQL: CommandeSQL): Promise<void> {
    const commandeMongo = await CommandeMongo.findById(commandeSQL.commandeId).exec();

    const newCommande: { [key: string]: any } = {
        _id: commandeSQL.commandeId,
        dateCommande: commandeSQL.dateCommande,
        piece: {
            _id: commandeSQL.pieceId,
        },
        quantiteCommandee: commandeSQL.quantiteCommandee,
        coutTotal: commandeSQL.coutTotal,
        dateLivraison: commandeSQL.dateLivraison,
        statutCommande: commandeSQL.statutCommande,
        user: {
            _id: commandeSQL.userId,
        },
    };

    if (commandeMongo) {
        const isSame = Object.keys(newCommande).every(key => 
            JSON.stringify(newCommande[key]) === JSON.stringify((commandeMongo as { [key: string]: any })[key])
        );

        if (!isSame) {
            await CommandeMongo.findByIdAndUpdate(commandeSQL.commandeId, newCommande).exec();
        }
    } else {
        await CommandeMongo.create(newCommande);
    }
}

async function insertCommandeToMongo(): Promise<void> {
    const commandes = await Commande.findAll();

    for (const commande of commandes) {
        await insertOrUpdateCommandeInMongo(commande as unknown as CommandeSQL);
    }
}

export default insertCommandeToMongo;
