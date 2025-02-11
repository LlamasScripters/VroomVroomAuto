import { UUID } from '@domain/value-objects/UUID';

export class EntretienPiece {
  constructor(
    public readonly entretienPieceId: UUID,
    public readonly entretienId: UUID,
    public readonly pieceId: UUID,
    public readonly quantite: number,
    public readonly prixUnitaire: number,
    public readonly userId: UUID
  ) {
    this.validateQuantite(quantite);
    this.validatePrixUnitaire(prixUnitaire);
  }

  private validateQuantite(quantite: number): void {
    if (quantite <= 0) {
      throw new Error('La quantité doit être supérieure à 0');
    }
  }

  private validatePrixUnitaire(prix: number): void {
    if (prix < 0) {
      throw new Error('Le prix ne peut pas être négatif');
    }
  }

  public calculerCoutTotal(): number {
    return this.quantite * this.prixUnitaire;
  }

  public static create(
    entretienPieceId: UUID,
    entretienId: UUID,
    pieceId: UUID,
    quantite: number,
    prixUnitaire: number,
    userId: UUID
  ): EntretienPiece {
    return new EntretienPiece(
      entretienPieceId,
      entretienId,
      pieceId,
      quantite,
      prixUnitaire,
      userId
    );
  }
}