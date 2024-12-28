import { UUID } from '../value-objects/UUID';

export class Piece {
    constructor(
      private readonly pieceId: UUID,
      private readonly nom: string,
      private readonly reference: string,
      private readonly quantiteEnStock: number,
      private readonly seuilCritique: number,
      private readonly categorie: string
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

    public getNom(): string {
      return this.nom;
    }

    public getReference(): string {
      return this.reference;
    }

    public getQuantiteEnStock(): number {
      return this.quantiteEnStock;
    }

    public getSeuilCritique(): number {
      return this.seuilCritique;
    }

    public getCategorie(): string {
      return this.categorie;
    }

    public getPieceId(): UUID {
      return this.pieceId;
    }
  }