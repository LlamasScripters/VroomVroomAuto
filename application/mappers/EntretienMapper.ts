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
    datePrevue: entretien.datePrevue.toISOString(),
    dateRealisee: entretien.dateRealisee.toISOString(),
    kilometrageEntretien: entretien.kilometrageEntretien,
    recommandationsTechnicien: entretien.recommandationsTechnicien,
    recommandationsGestionnaireClient: entretien.recommandationsGestionnaireClient,
    coutMainOeuvre: entretien.coutMainOeuvre,
    coutPieces: entretien.coutPieces,
    coutTotal: entretien.getCoutTotal(),
    statut: entretien.statut,
    userId: entretien.userId.toString()
  };
}

export function toDomain(dto: EntretienDTO): Entretien {
  return Entretien.create(
    new UUID(dto.entretienId),
    new UUID(dto.motoId),
    dto.typeEntretien,
    new Date(dto.datePrevue),
    new Date(dto.dateRealisee),
    dto.kilometrageEntretien,
    dto.recommandationsTechnicien,
    dto.recommandationsGestionnaireClient,
    dto.statut,
    new UUID(dto.userId),
    dto.coutMainOeuvre,
    dto.coutPieces,
    dto.motoDetails
  );
}