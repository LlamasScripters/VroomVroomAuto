// application/mappers/PieceFournisseurMapper.ts
import { PieceFournisseur } from '@domain/entities/PieceFournisseurEntity';
import { UUID } from '@domain/value-objects/UUID';
import { PieceFournisseurDTO } from '@application/dtos/PieceFournisseurDTO';

export function toDTO(piece: PieceFournisseur): PieceFournisseurDTO {
    return {
        pieceId: piece.pieceId.toString(),
        reference: piece.reference,
        nom: piece.nom,
        description: piece.description,
        categorie: piece.categorie,
        prixUnitaire: piece.prixUnitaire,
        quantiteEnStock: piece.quantiteEnStock,
        seuilCritique: piece.seuilCritique,
        fournisseur: piece.fournisseur,
        stockCritique: piece.isStockCritique(),
        disponible: piece.isDisponible()
    };
}

export function toDomain(dto: PieceFournisseurDTO): PieceFournisseur {
    return PieceFournisseur.create(
        new UUID(dto.pieceId),
        dto.reference,
        dto.nom,
        dto.description,
        dto.categorie as any,
        dto.prixUnitaire,
        dto.quantiteEnStock,
        dto.seuilCritique,
        dto.fournisseur
    );
}