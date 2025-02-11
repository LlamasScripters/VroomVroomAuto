import { Panne } from '@domain/entities/PanneEntity';
import { UUID } from '@domain/value-objects/UUID';
import { PanneDTO } from '@application/dtos/PanneDTO';

export function toDTO(panne: Panne): PanneDTO {
    return {
        panneId: panne.panneId.toString(),
        motoId: panne.motoId.toString(),
        description: panne.description,
        date: panne.date.toISOString(),
        actionCorrective: panne.actionCorrective,
        status: panne.status,
        userId: panne.userId.toString()
    };
}

export function toDomain(dto: PanneDTO): Panne {
    return Panne.create(
        new UUID(dto.panneId),
        new UUID(dto.motoId),
        dto.description,
        new Date(dto.date),
        dto.actionCorrective,
        dto.status,
        new UUID(dto.userId)
    );
}