import { UUID } from '../value-objects/UUID';

export class Client {
  // déplacer le nodeModules dans domain
  // utiliser validator pour les emails au lieu de regex
    constructor(
      public readonly clientId: UUID,
      public readonly nom: string,
      public readonly prenom: string,
      public readonly mail: string,
      public readonly telephone: string,
      public readonly numeroDeRue: number,
      public readonly nomDeRue: string,
      public readonly codePostal: string,
      public readonly ville: string,
      public readonly pays: string,
      public readonly userId: UUID
    ) {}

    public static create(
      clientId: UUID,
      nom: string,
      prenom: string,
      mail: string,
      telephone: string,
      numeroDeRue: number,
      nomDeRue: string,
      codePostal: string,
      ville: string,
      pays: string,
      userId: UUID
    ): Client {
      return new Client(clientId, nom, prenom, mail, telephone, numeroDeRue, nomDeRue, codePostal, ville, pays, userId);
    }

    public getFullAddress(): string {
      return this.numeroDeRue + ' ' + this.nomDeRue + ' ' + this.codePostal + ' ' + this.ville + ' ' + this.pays;
    }
  }