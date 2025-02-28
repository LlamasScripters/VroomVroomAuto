// application/mappers/MotoMapper.ts

import { Moto } from '@domain/entities/MotoEntity';
import { UUID } from '@domain/value-objects/UUID';
import { MotoDTO, UserDTO } from '@application/dtos/MotoDTO';

export function toDTO(moto: Moto): MotoDTO {
  return {
    motoId: moto.motoId.toString(),
    marque: moto.marque,
    model: moto.model,
    serialNumber: moto.serialNumber,
    kilometrage: moto.kilometrage,
    dateMiseEnService: moto.dateMiseEnService.toISOString(),
    statut: moto.statut,
    userId: moto.userId.toString(),
    user: moto.user ? {
      userId: moto.user.userId,
      username: moto.user.username,
      email: moto.user.email
    } : undefined

  };
}

export function toDomain(dto: MotoDTO): Moto {
  return Moto.create(
    new UUID(dto.motoId),
    dto.marque,
    dto.model,
    dto.kilometrage,
    new Date(dto.dateMiseEnService),
    dto.statut,
    dto.serialNumber, 
    new UUID(dto.userId),
    dto.user
  );
}