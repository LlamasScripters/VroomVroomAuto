import { Garantie } from '../../domain/entities/GarantieEntity';
import { UUID } from '../../domain/value-objects/UUID';
import { GarantieDTO } from '../dtos/GarantieDTO';

export function toDTO(garantie: Garantie): GarantieDTO {
    return {
        garantieId: garantie.garantieId.toString(),
        panneId: garantie.panneId.toString(),
        motoId: garantie.motoId.toString(),
        couverture: garantie.couverture,
        type: garantie.type,
        dateDebut: garantie.dateDebut.toISOString(),
        dateFin: garantie.dateFin.toISOString(),
        statut: garantie.statut
    };
}

export function toDomain(dto: GarantieDTO): Garantie {
    return Garantie.create(
        new UUID(dto.garantieId),
        new UUID(dto.panneId),
        new UUID(dto.motoId),
        dto.couverture,
        dto.type,
        new Date(dto.dateDebut),
        new Date(dto.dateFin),
        dto.statut
    );
}