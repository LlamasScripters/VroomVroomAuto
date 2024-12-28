import { UUID } from '../value-objects/UUID';

export class Commande {
  constructor(
    private commandeId: UUID,
    private dateCommande: Date,
    private pieceId: UUID,
    private quantiteCommandee: number,
    private coutTotal: number,
    private dateLivraison: Date,
    private statutCommande: string,
    private userId: UUID
  ) {}
  public static create(
    commandeId: UUID,
    dateCommande: Date,
    pieceId: UUID,
    quantiteCommandee: number,
    coutTotal: number,
    dateLivraison: Date,
    statutCommande: string,
    userId: UUID
  ): Commande {
    return new Commande(commandeId,dateCommande,pieceId,quantiteCommandee,coutTotal,dateLivraison,statutCommande,userId);
  }

  public getCommandeId(): UUID {
    return this.commandeId;
  }

  public getDateCommande(): Date {
    return this.dateCommande;
  }

  public getPieceId(): UUID {
    return this.pieceId;
  }

  public getQuantiteCommandee(): number {
    return this.quantiteCommandee;
  }

  public getCoutTotal(): number {
    return this.coutTotal;
  }

  public getDateLivraison(): Date {
    return this.dateLivraison;
  }

  public getStatutCommande(): string {
    return this.statutCommande;
  }

  public getUserId(): UUID {
    return this.userId;
  }
}
