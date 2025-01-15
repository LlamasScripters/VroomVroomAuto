// application/mappers/MotoMapper.ts
import { Moto } from '../../domain/entities/MotoEntity';
import { MotoDTO } from '../dtos/MotoDTO';
import { UUID } from '../../domain/value-objects/UUID';

export class MotoMapper {
  static toDTO(moto: Moto): MotoDTO {
    return {
      motoId: moto.motoId.toString(),
      marque: moto.marque,
      model: moto.model,
      serialNumber: moto.serialNumber,
      kilometrage: moto.kilometrage,
      dateMiseEnService: moto.dateMiseEnService.toISOString(),
      statut: moto.statut,
      clientId: moto.clientId.toString()
    };
  }

  static toDomain(dto: MotoDTO): Moto {
    return Moto.create(
      new UUID(dto.motoId),
      dto.marque,
      dto.model,
      dto.kilometrage,
      new Date(dto.dateMiseEnService),
      dto.statut,
      dto.serialNumber,
      new UUID(dto.clientId)
    );
  }
}