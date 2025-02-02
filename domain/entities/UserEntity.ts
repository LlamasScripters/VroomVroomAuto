import { UUID } from '../value-objects/UUID';
import { Email } from '../value-objects/EMAIL';
import { Password } from '../value-objects/PASSWORD';
import { Role } from '../value-objects/ROLE';
import { Username } from '../value-objects/USERNAME';

export class User {
    constructor(
      public readonly userId: UUID,
      public readonly username: Username,
      public readonly email: Email,
      public readonly password: Password,
      public readonly role: Role,
      public readonly isValidated: boolean,
      public readonly dateCreation: Date,
      public readonly derniereConnexion: Date
    ) {}

    public static create(
      userId: UUID,
      username: Username,
      email: Email,
      password: Password,
      role: Role,
      isValidated: boolean,
      dateCreation: Date,
      derniereConnexion: Date
    ): User {
      return new User(userId, username, email, password, role, isValidated, dateCreation, derniereConnexion);
    }
  }