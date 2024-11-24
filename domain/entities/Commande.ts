export class Commande {
    constructor(
      public commandeId: string,
      public dateCommande: Date,
      public pieceId: string,
      public quantiteCommandee: number,
      public coutTotal: number,
      public dateLivraison: Date,
      public statutCommande: string,
      public userId: string
    ) {}
  }