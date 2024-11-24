export class User {
    constructor(
      public userId: string,
      public username: string,
      public email: string,
      public motDePasse: string,
      public role: string,
      public dateCreation: Date,
      public derniereConnexion: Date
    ) {}
  }