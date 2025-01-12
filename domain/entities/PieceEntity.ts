import { UUID } from '../value-objects/UUID';

export class Piece {
    constructor(
      public readonly pieceId: UUID,
      public readonly nom: string,
      public readonly reference: string,
      public readonly quantiteEnStock: number,
      public readonly seuilCritique: number,
      public readonly categorie: string
    ) {}

    public static create(
      pieceId: UUID,
      nom: string,
      reference: string,
      quantiteEnStock: number,
      seuilCritique: number,
      categorie: string
    ): Piece {
      return new Piece(pieceId, nom, reference, quantiteEnStock, seuilCritique, categorie);
    }

  }