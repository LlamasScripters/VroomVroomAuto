// application/mappers/PieceMapper.ts
import { Piece } from '@domain/entities/PieceEntity';
import { UUID } from '@domain/value-objects/UUID';
import { PieceDTO } from '@application/dtos/PieceDTO';

export function toDTO(piece: Piece): PieceDTO {
  return {
    pieceId: piece.pieceId.toString(),
    nom: piece.nom,
    reference: piece.reference,
    quantiteEnStock: piece.quantiteEnStock,
    seuilCritique: piece.seuilCritique,
    categorie: piece.categorie,
    fournisseur: piece.fournisseur,
    prixUnitaire: piece.prixUnitaire,
    stockCritique: piece.isStockCritique()
  };
}

export function toDomain(dto: PieceDTO): Piece {
  return Piece.create(
    new UUID(dto.pieceId),
    dto.nom,
    dto.reference,
    dto.quantiteEnStock,
    dto.seuilCritique,
    dto.categorie,
    dto.fournisseur,
    dto.prixUnitaire
  );
}