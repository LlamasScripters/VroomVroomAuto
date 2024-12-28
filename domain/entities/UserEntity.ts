import { UUID } from '../value-objects/UUID';
import { Email } from '../value-objects/EMAIL';
import { Password } from '../value-objects/PASSWORD';

export class User {
    constructor(
      private readonly userId: UUID,
      private readonly username: string,
      private readonly email: Email,
      private readonly motDePasse: Password,
      private readonly role: string,
      private readonly dateCreation: Date,
      private readonly derniereConnexion: Date
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

    public getUserId(): UUID {
      return this.userId;
    }

    public getUsername(): string {
      return this.username;
    }

    public getEmail(): Email {
      return this.email;
    }

    public getMotDePasse(): Password {
      return this.motDePasse;
    }

    public getRole(): string {
      return this.role;
    }

    public getDateCreation(): Date {
      return this.dateCreation;
    }

    public getDerniereConnexion(): Date {
      return this.derniereConnexion;
    }
  }