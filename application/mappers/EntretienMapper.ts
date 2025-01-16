// application/mappers/EntretienMapper.ts
import { Entretien } from '../../domain/entities/EntretienEntity';
import { EntretienDTO } from '../dtos/EntretienDTO';
import { UUID } from '../../domain/value-objects/UUID';

export class EntretienMapper {
  static toDTO(entretien: Entretien): EntretienDTO {
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
      cout: entretien.cout,
      statut: entretien.statut,
      userId: entretien.userId.toString()
    };
  }

  static toDomain(dto: EntretienDTO): Entretien {
    return Entretien.create(
      new UUID(dto.entretienId),
      new UUID(dto.motoId),
      dto.typeEntretien,
      new Date(dto.datePrevue),
      new Date(dto.dateRealisee),
      dto.kilometrageEntretien,
      dto.recommandationsTechnicien,
      dto.recommandationsGestionnaireClient,
      dto.cout,
      dto.statut,
      new UUID(dto.userId)
    );
  }
}