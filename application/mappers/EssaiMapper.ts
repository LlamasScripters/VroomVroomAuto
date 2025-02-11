import { Essai } from "@domain/entities/EssaiEntity";
import { UUID } from "@domain/value-objects/UUID";
import { EssaiDTO } from "@application/dtos/EssaiDTO";

export function toDTO(essai: Essai): EssaiDTO {
    return {
        essaiId: essai.essaiId.toString(),
        motoId: essai.motoId.toString(),
        conducteurId: essai.conducteurId.toString(),
        dateDebut: essai.dateDebut.toISOString(),
        dateFin: essai.dateFin.toISOString(),
        duree: essai.duree,
        userId: essai.userId.toString()
    };
}

export function toDomain(dto: EssaiDTO): Essai {
    return Essai.create(
        new UUID(dto.essaiId),
        new UUID(dto.motoId),
        new UUID(dto.conducteurId),
        new Date(dto.dateDebut),
        new Date(dto.dateFin),
        dto.duree,
        new UUID(dto.userId)
    );
}