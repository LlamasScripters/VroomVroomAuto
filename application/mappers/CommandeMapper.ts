// application/mappers/CommandeMapper.ts
import { Commande } from '@domain/entities/CommandeEntity';
import { UUID } from '@domain/value-objects/UUID';
import { CommandeDTO } from '@application/dtos/CommandeDTO';
import { CommandeStatut } from '@domain/entities/CommandeEntity';

export function toDTO(commande: Commande): CommandeDTO {
  return {
    commandeId: commande.commandeId.toString(),
    pieceId: commande.pieceId.toString(),
    pieceDetails: commande.pieceDetails ? {
      nom: commande.pieceDetails.nom,
      reference: commande.pieceDetails.reference,
      prixUnitaire: commande.pieceDetails.prixUnitaire,
      categorie: commande.pieceDetails.categorie,
      fournisseur: commande.pieceDetails.fournisseur
  } : undefined,
    quantiteCommandee: commande.quantiteCommandee,
    coutTotal: commande.coutTotal,
    dateCommande: commande.dateCommande.toISOString(),
    dateLivraisonPrevue: commande.dateLivraisonPrevue.toISOString(),
    statut: commande.statut,
    gestionnaireid: commande.gestionnaireid.toString()
  };
}

export function toDomain(dto: CommandeDTO): Commande {
  return Commande.create(
    new UUID(dto.commandeId),
    new UUID(dto.pieceId),
    new UUID(dto.gestionnaireid),
    dto.quantiteCommandee,
    dto.coutTotal,
    new Date(dto.dateCommande),
    new Date(dto.dateLivraisonPrevue),
    dto.statut as CommandeStatut,
    dto.pieceDetails && {
      nom: dto.pieceDetails.nom,
      reference: dto.pieceDetails.reference,
      prixUnitaire: dto.pieceDetails.prixUnitaire,
      categorie: dto.pieceDetails.categorie,
      fournisseur: dto.pieceDetails.fournisseur
  }
  );
}
