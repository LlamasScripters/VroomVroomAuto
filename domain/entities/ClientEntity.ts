import { UUID } from '../value-objects/UUID';

export class Client {
    constructor(
      private readonly clientId: UUID,
      private readonly nom: string,
      private readonly prenom: string,
      private readonly mail: string,
      private readonly telephone: string,
      private readonly numeroDeRue: number,
      private readonly nomDeRue: string,
      private readonly codePostal: string,
      private readonly ville: string,
      private readonly pays: string,
      private readonly userId: UUID
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

    public getNom(): string {
      return this.nom;
    } 

    public getPrenom(): string {
      return this.prenom;
    } 

    public getMail(): string {
      return this.mail;
    } 

    public getTelephone(): string {
      return this.telephone;
    } 

    public getNumeroDeRue(): number { 
      return this.numeroDeRue;
    }
    
    public getNomDeRue(): string {
      return this.nomDeRue;
    }

    public getCodePostal(): string {
      return this.codePostal;
    }

    public getVille(): string {
      return this.ville;
    }

    public getPays(): string {
      return this.pays;
    }

    public getUserId(): UUID {
      return this.userId;
    }

    public getClientId(): UUID {
      return this.clientId;
    }
  }