export class Piece {
    constructor(
      public pieceId: string,
      public nom: string,
      public reference: string,
      public quantiteEnStock: number,
      public seuilCritique: number,
      public categorie: string
    ) {}
  }