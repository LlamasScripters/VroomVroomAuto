// domain/entities/PieceEntity.ts
import { UUID } from '@domain/value-objects/UUID';

export interface PieceDetails {
  nom: string;
  reference: string;
  quantiteEnStock: number;
  seuilCritique: number;
  categorie: string;
  fournisseur?: string;
  prixUnitaire?: number;
}

export class Piece {
  constructor(
    public readonly pieceId: UUID,
    public readonly nom: string,
    public readonly reference: string,
    public readonly quantiteEnStock: number,
    public readonly seuilCritique: number,
    public readonly categorie: string,
    public readonly fournisseur?: string,
    public readonly prixUnitaire?: number
  ) {
    this.validateQuantite(quantiteEnStock);
    this.validateSeuilCritique(seuilCritique);
  }

  private validateQuantite(quantite: number): void {
    if (quantite < 0) {
      throw new Error('La quantité en stock ne peut pas être négative');
    }
  }

  private validateSeuilCritique(seuil: number): void {
    if (seuil < 0) {
      throw new Error('Le seuil critique ne peut pas être négatif');
    }
  }

  public isStockCritique(): boolean {
    return this.quantiteEnStock <= this.seuilCritique;
  }

  public static create(
    pieceId: UUID,
    nom: string,
    reference: string,
    quantiteEnStock: number,
    seuilCritique: number,
    categorie: string,
    fournisseur?: string,
    prixUnitaire?: number
  ): Piece {
    return new Piece(
      pieceId,
      nom,
      reference,
      quantiteEnStock,
      seuilCritique,
      categorie,
      fournisseur,
      prixUnitaire
    );
  }
}