import "../modelsSQL/associations";
import UserMongo from "../modelsMongo/user.mongo";
import User from "../modelsSQL/user.sql";
import { UserSQL } from "../interfaces/modelsSQL.interface";

async function insertOrUpdateUserInMongo(userSQL: UserSQL): Promise<void> {
    const userMongo = await UserMongo.findById(userSQL.userId).exec();

    const newUser: { [key: string]: any } = {
        _id: userSQL.userId,
        username: userSQL.username,
        email: userSQL.email,
        role: userSQL.role,
        isValidated: userSQL.isValidated,
        dateCreation: userSQL.dateCreation,
        derniereConnexion: userSQL.derniereConnexion,
    };

    if (userMongo) {
        const isSame = Object.keys(newUser).every(key => 
            JSON.stringify(newUser[key]) === JSON.stringify((userMongo as { [key: string]: any })[key])
        );

        if (!isSame) {
            await UserMongo.findByIdAndUpdate(userSQL.userId, newUser).exec();
        }
    } else {
        await UserMongo.create(newUser);
    }
}

async function insertUserToMongo(): Promise<void> {
    const users = await User.findAll();

    for (const user of users) {
        await insertOrUpdateUserInMongo(user as unknown as UserSQL);
    }
}

export default insertUserToMongo;
