import { UUID } from '@domain/value-objects/UUID';
import { Email } from '@domain/value-objects/EMAIL';
import { Password } from '@domain/value-objects/PASSWORD';
import { Role } from '@domain/value-objects/ROLE';
import { Username } from '@domain/value-objects/USERNAME';

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