// application/mappers/ConducteurMapper.ts
import { Conducteur, DisponibiliteConducteur, StatutConducteur } from '@domain/entities/ConducteurEntity';
import { UUID } from '@domain/value-objects/UUID';
import { ConducteurDTO } from '@application/dtos/ConducteurDTO';

export function toDTO(conducteur: Conducteur): ConducteurDTO {
    return {
        conducteurId: conducteur.conducteurId.toString(),
        nom: conducteur.nom,
        prenom: conducteur.prenom,
        dateNaissance: conducteur.dateNaissance.toISOString(),
        numeroPermis: conducteur.numeroPermis,
        categoriePermis: conducteur.categoriePermis,
        dateObtentionPermis: conducteur.dateObtentionPermis.toISOString(),
        dateValiditePermis: conducteur.dateValiditePermis.toISOString(),
        anneeExperience: conducteur.anneeExperience,
        telephone: conducteur.telephone,
        email: conducteur.email,
        disponibilite: conducteur.disponibilite,
        statut: conducteur.statut,
        gestionnaireid: conducteur.gestionnaireid.toString(),
        dateCreation: conducteur.dateCreation.toISOString(),
        derniereModification: conducteur.derniereModification.toISOString(),
        permisValide: conducteur.isPermisValide()
    };
}

export function toDomain(dto: ConducteurDTO): Conducteur {
    return Conducteur.create(
        new UUID(dto.conducteurId),
        dto.nom,
        dto.prenom,
        new Date(dto.dateNaissance),
        dto.numeroPermis,
        dto.categoriePermis,
        new Date(dto.dateObtentionPermis),
        new Date(dto.dateValiditePermis),
        dto.anneeExperience,
        dto.telephone,
        dto.email,
        dto.disponibilite as DisponibiliteConducteur,
        dto.statut as StatutConducteur,
        new UUID(dto.gestionnaireid),
        new Date(dto.dateCreation),
        new Date(dto.derniereModification)
    );
}