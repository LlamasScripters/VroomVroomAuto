import { UUID } from "@domain/value-objects/UUID";
import { Email } from "@domain/value-objects/EMAIL";
import { Password } from "@domain/value-objects/PASSWORD";
import { Username } from "@domain/value-objects/USERNAME";
import { Role } from "@domain/value-objects/ROLE";
import { User } from "@domain/entities/UserEntity";
import { UserRepository } from "@application/repositories/UserRepository";
import UserSQL from "../modelsSQL/user.sql";
import { Model } from "sequelize";


interface UserModel extends Model {
    userId: string;
    username: string;
    email: string;
    password: string;
    role: string;
    isValidated: boolean;
    dateCreation: Date;
    derniereConnexion: Date;
}

// déplacer le dossier repositories dans infrastructures et le renommer en adapters
// applications -> ports -> repositories cela definie ce qui peut rentrer en données (c'est un iphone)
// infrastructures -> adapters -> repositories cela définie le comment  (comment tu fabriques l'iphone)
export class UserRepositorySQL implements UserRepository {
    async save(user: User): Promise<User> {
        try {
            const createdUser = await UserSQL.create({
                userId: user.userId.toString(),              
                username: user.username.toString(),          
                email: user.email.toString(),                
                password: user.password.toString(),          
                role: user.role.toString(),
                isValidated: user.isValidated,
                dateCreation: user.dateCreation,
                derniereConnexion: user.derniereConnexion
            });

            return this.toDomain(createdUser as UserModel);

        } catch (error) {
            throw new Error(`Erreur lors de la sauvegarde du user test: ${error}`);
        }
    }

    async findById(userId: UUID): Promise<User | null> {
        const user = await UserSQL.findByPk(userId.toString()) as UserModel | null;
        if (!user) return null;

        return this.toDomain(user);
    }

   async findByEmail(email: Email): Promise<User | null> {
        const user = await UserSQL.findOne({ where: { email: email.toString() }}) as UserModel | null;

        if (!user) return null;

        return this.toDomain(user);

   }

    async delete(userId: UUID): Promise<boolean> {
        const userSQL = await UserSQL.destroy({
            where: { userId: userId.toString() }
        });
        return userSQL ? true : false;
    }

    async findAll(): Promise<User[]> {
        const users = await UserSQL.findAll() as UserModel[];
        return users.map(user => this.toDomain(user));
    }

    async update(user: User): Promise<User> {
        await UserSQL.update({
            username: user.username.toString(),
            email: user.email.toString(),
            password: user.password.toString(),
            role: user.role,
            dateCreation: user.dateCreation,
            derniereConnexion: user.derniereConnexion
        }, {
            where: {
                userId: user.userId.toString()   
            },
            returning: true
        });

        const updatedUser = await UserSQL.findByPk(user.userId.toString()) as UserModel;
        if (!updatedUser) throw new Error("User not found after update");

        return this.toDomain(updatedUser);
    }

private toDomain(model: UserModel): User {
  return User.create(
    new UUID(model.userId),
    new Username(model.username),
    new Email(model.email),
    new Password(model.password),
    new Role(model.role as "admin" | "user" | "gestionnaire"),
    model.isValidated,
    model.dateCreation,
    model.derniereConnexion
  );
}
}