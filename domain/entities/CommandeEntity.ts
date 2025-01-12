import { UUID } from '../value-objects/UUID';

export class Commande {
  constructor(
    public readonly commandeId: UUID,
    public readonly dateCommande: Date,
    public readonly pieceId: UUID,
    public readonly quantiteCommandee: number,
    public readonly coutTotal: number,
    public readonly dateLivraison: Date,
    public readonly statutCommande: string,
    public readonly userId: UUID
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

}
