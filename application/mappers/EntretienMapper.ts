// application/mappers/EntretienMapper.ts

import { Entretien } from '@domain/entities/EntretienEntity';
import { UUID } from '@domain/value-objects/UUID';
import { EntretienDTO } from '@application/dtos/EntretienDTO';

export function toDTO(entretien: Entretien): EntretienDTO {
  return {
    entretienId: entretien.entretienId.toString(),
    motoId: entretien.motoId.toString(),
    motoDetails: entretien.motoDetails,
    typeEntretien: entretien.typeEntretien,
    datePrevue: entretien.datePrevue ? entretien.datePrevue.toISOString() : null,
    dateRealisee: entretien.dateRealisee ? entretien.dateRealisee.toISOString() : null,
    kilometrageEntretien: entretien.kilometrageEntretien,
    recommandationsTechnicien: entretien.recommandationsTechnicien,
    recommandationsGestionnaireClient: entretien.recommandationsGestionnaireClient,
    coutMainOeuvre: entretien.coutMainOeuvre,
    coutPieces: entretien.coutPieces,
    coutTotal: entretien.getCoutTotal(),
    statut: entretien.statut,
    userId: entretien.userId.toString(),
    gestionnaireId: entretien.gestionnaireId.toString(),
  };
}


export function toDomain(dto: EntretienDTO): Entretien {
  return Entretien.create(
    new UUID(dto.entretienId),
    new UUID(dto.motoId),
    dto.typeEntretien,
    new Date(dto.datePrevue || Date.now()),
    new Date(dto.dateRealisee || Date.now()),
    dto.kilometrageEntretien,
    dto.recommandationsTechnicien,
    dto.recommandationsGestionnaireClient,
    dto.statut,
    new UUID(dto.userId),
    new UUID(dto.gestionnaireId),
    dto.coutMainOeuvre,
    dto.coutPieces,
    dto.motoDetails
  );
}