// application/mappers/CommandeMapper.ts
import { Commande } from '@domain/entities/CommandeEntity';
import { UUID } from '@domain/value-objects/UUID';
import { CommandeDTO } from '@application/dtos/CommandeDTO';

export function toDTO(commande: Commande): CommandeDTO {
  return {
    commandeId: commande.commandeId.toString(),
    pieceId: commande.pieceId.toString(),
    pieceDetails: commande.pieceDetails,
    quantiteCommandee: commande.quantiteCommandee,
    coutTotal: commande.coutTotal,
    dateCommande: commande.dateCommande.toISOString(),
    dateLivraisonPrevue: commande.dateLivraisonPrevue.toISOString(),
    statut: commande.statut,
    userId: commande.userId.toString()
  };
}

export function toDomain(dto: CommandeDTO): Commande {
  return Commande.create(
    new UUID(dto.commandeId),
    new UUID(dto.pieceId),
    dto.quantiteCommandee,
    dto.coutTotal,
    new Date(dto.dateCommande),
    new Date(dto.dateLivraisonPrevue),
    dto.statut,
    new UUID(dto.userId),
    dto.pieceDetails
  );
}
