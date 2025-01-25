import "../modelsSQL/associations";
import ClientMongo from "../modelsMongo/client.mongo";
import Client from "../modelsSQL/client.sql";
import { ClientSQL } from "../interfaces/modelsSQL.interface";


async function insertOrUpdateClientInMongo(clientSQL: ClientSQL): Promise<void> {
    const clientMongo = await ClientMongo.findById(clientSQL.clientId).exec();

    const newClient: { [key: string]: any } = {
        _id: clientSQL.clientId,
        nom: clientSQL.nom,
        prenom: clientSQL.prenom,
        email: clientSQL.email,
        telephone: clientSQL.telephone,
        user: {
            _id: clientSQL.userId,
        },
    };

    if (clientMongo) {
        const isSame = Object.keys(newClient).every(key => 
            JSON.stringify(newClient[key]) === JSON.stringify((clientMongo as { [key: string]: any })[key])
        );

        if (!isSame) {
            await ClientMongo.findByIdAndUpdate(clientSQL.clientId, newClient).exec();
        }
    } else {
        await ClientMongo.create(newClient);
    }
}

async function insertClientToMongo(): Promise<void> {
    let clients = await Client.findAll();

    for (const client of clients) {
        await insertOrUpdateClientInMongo(client as unknown as ClientSQL);
    }
}

export default insertClientToMongo;
