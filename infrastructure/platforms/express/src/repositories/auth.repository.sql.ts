import { AuthRepository } from "@application/repositories/AuthRepository";
import { User } from "@domain/entities/UserEntity";
import { UUID } from "@domain/value-objects/UUID";
import { Email } from "@domain/value-objects/EMAIL";
import { Password } from "@domain/value-objects/PASSWORD";
import { Role } from "@domain/value-objects/ROLE";
import { Username } from "@domain/value-objects/USERNAME";
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

export class AuthRepositorySQL implements AuthRepository {
  async findByEmail(email: Email): Promise<User | null> {
    const user = await UserSQL.findOne({ where: { email: email.toString() } }) as UserModel | null;
    if (!user) return null;
    return this.toDomain(user);
  }

  async save(user: User): Promise<User> {
    try {
      console.log('Données avant la création Sequelize:', {
        userId: user.userId.toString(),
        username: user.username.toString(),
        email: user.email.toString(),
        password: user.password.toString(),
        role: user.role.toString(),
        isValidated: user.isValidated,
        dateCreation: user.dateCreation,
        derniereConnexion: user.derniereConnexion,
      });
  
      const createdUser = await UserSQL.create({
        userId: user.userId.toString(),
        username: user.username.toString(),
        email: user.email.toString(),
        password: user.password.toString(),
        role: user.role.toString(),
        isValidated: user.isValidated,
        dateCreation: user.dateCreation,
        derniereConnexion: user.derniereConnexion,
      });
  
      return this.toDomain(createdUser as UserModel);
    } catch (error) {
      console.error('Erreur Sequelize:', error);
      throw new Error(`Erreur lors de la sauvegarde du user: ${error}`);
    }
  }

  async findById(userId: UUID): Promise<User | null> {
    const user = await UserSQL.findByPk(userId.toString()) as UserModel | null;
    if (!user) return null;
    return this.toDomain(user);
  }

  async update(user: User): Promise<User> {
    await UserSQL.update(
      {
        username: user.username.toString(),
        email: user.email.toString(),
        password: user.password.toString(),
        role: user.role.toString(),
        isValidated: user.isValidated,
        dateCreation: user.dateCreation,
        derniereConnexion: user.derniereConnexion
      },
      {
        where: { userId: user.userId.toString() },
        returning: true
      }
    );

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
      new Role(model.role as "USER" | "ADMIN"),
      model.isValidated,
      model.dateCreation,
      model.derniereConnexion
    );
  }
}
