// application/usecases/conducteur/ConducteurCrudUseCases.ts
import { Conducteur, DisponibiliteConducteur, StatutConducteur } from '@domain/entities/ConducteurEntity';
import { ConducteurRepository } from '@application/repositories/ConducteurRepository';
import { UUID } from '@domain/value-objects/UUID';
import { CreateConducteurDTO, UpdateConducteurDTO } from '@application/dtos/ConducteurDTO';

export class ConducteurCrudUseCases {
    constructor(private conducteurRepository: ConducteurRepository) {}

    async createConducteur(conducteurData: CreateConducteurDTO): Promise<Conducteur> {
        const conducteur = Conducteur.create(
            new UUID(),
            conducteurData.nom,
            conducteurData.prenom,
            new Date(conducteurData.dateNaissance),
            conducteurData.numeroPermis,
            conducteurData.categoriePermis,
            new Date(conducteurData.dateObtentionPermis),
            new Date(conducteurData.dateValiditePermis),
            conducteurData.anneeExperience,
            conducteurData.telephone,
            conducteurData.email,
            conducteurData.disponibilite as DisponibiliteConducteur,
            StatutConducteur.ACTIF,
            new UUID(conducteurData.gestionnaireid)
        );

        return await this.conducteurRepository.save(conducteur);
    }

    async getConducteurById(conducteurId: string): Promise<Conducteur | null> {
        return await this.conducteurRepository.findById(new UUID(conducteurId));
    }

    async updateConducteur(updatedData: UpdateConducteurDTO): Promise<Conducteur | null> {
        const conducteur = await this.conducteurRepository.findById(new UUID(updatedData.conducteurId));
        if (!conducteur) return null;

        const updatedConducteur = Conducteur.create(
            conducteur.conducteurId,
            updatedData.nom ?? conducteur.nom,
            updatedData.prenom ?? conducteur.prenom,
            updatedData.dateNaissance ? new Date(updatedData.dateNaissance) : conducteur.dateNaissance,
            updatedData.numeroPermis ?? conducteur.numeroPermis,
            updatedData.categoriePermis ?? conducteur.categoriePermis,
            updatedData.dateObtentionPermis ? new Date(updatedData.dateObtentionPermis) : conducteur.dateObtentionPermis,
            updatedData.dateValiditePermis ? new Date(updatedData.dateValiditePermis) : conducteur.dateValiditePermis,
            updatedData.anneeExperience ?? conducteur.anneeExperience,
            updatedData.telephone ?? conducteur.telephone,
            updatedData.email ?? conducteur.email,
            updatedData.disponibilite ?? conducteur.disponibilite,
            updatedData.statut ?? conducteur.statut,
            conducteur.gestionnaireid,
            conducteur.dateCreation,
            new Date()
        );

        return await this.conducteurRepository.update(updatedConducteur);
    }

    async deleteConducteur(conducteurId: string): Promise<boolean> {
        return await this.conducteurRepository.delete(new UUID(conducteurId));
    }

    async getAllConducteurs(): Promise<Conducteur[]> {
        return await this.conducteurRepository.findAll();
    }

    async getConducteursByGestionnaire(gestionnaireid: string): Promise<Conducteur[]> {
        return await this.conducteurRepository.findByGestionnaire(new UUID(gestionnaireid));
    }

    async getConducteursByDisponibilite(disponibilite: DisponibiliteConducteur): Promise<Conducteur[]> {
        return await this.conducteurRepository.findByDisponibilite(disponibilite);
    }
}