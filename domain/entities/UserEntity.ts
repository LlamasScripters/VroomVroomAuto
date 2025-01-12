import { UUID } from '../value-objects/UUID';
import { Email } from '../value-objects/EMAIL';
import { Password } from '../value-objects/PASSWORD';

export class User {
    constructor(
      public readonly userId: UUID,
      public readonly username: string,
      public readonly email: Email,
      public readonly motDePasse: Password,
      public readonly role: string,
      public readonly dateCreation: Date,
      public readonly derniereConnexion: Date
    ) {}

    public static create(
      userId: UUID,
      username: string,
      email: Email,
      motDePasse: Password,
      role: string
    ): User {
      const dateCreation = new Date(); 
      const derniereConnexion = new Date();
      return new User(userId, username, email, motDePasse, role, dateCreation, derniereConnexion);
    }

  }