// application/usecases/conducteur/ConducteurCrudUseCases.ts
import { Conducteur, DisponibiliteConducteur, StatutConducteur } from '@domain/entities/ConducteurEntity';
import { ConducteurRepository } from '@application/repositories/ConducteurRepository';
import { UUID } from '@domain/value-objects/UUID';
import { CreateConducteurDTO, UpdateConducteurDTO } from '@application/dtos/ConducteurDTO';
import { UserRepository } from '@application/repositories/UserRepository';

export class ConducteurCrudUseCases {
    constructor(
      private conducteurRepository: ConducteurRepository,
      private userRepository: UserRepository
    ) {}

    async createConducteur(conducteurData: CreateConducteurDTO): Promise<Conducteur> {
      // vérification si l'utilisateur existe
      const user = await this.userRepository.findById(new UUID(conducteurData.userId));
      if (!user) {
          throw new Error('Utilisateur non trouvé');
      }
  
      // vérification si l'utilisateur a déjà un profil conducteur
      const existingConducteur = await this.conducteurRepository.findByUser(new UUID(conducteurData.userId));
      if (existingConducteur) {
          throw new Error('Un profil conducteur existe déjà pour cet utilisateur');
      }
  
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
          conducteurData.email || user.email.toString(), // mail de l'user
          conducteurData.disponibilite as DisponibiliteConducteur,
          StatutConducteur.ACTIF,
          new UUID(conducteurData.userId)
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
            conducteur.userId,
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

    async getConducteursByUser(userId: string): Promise<Conducteur[]> {
        return await this.conducteurRepository.findByGestionnaire(new UUID(userId));
    }

    async getConducteursByDisponibilite(disponibilite: DisponibiliteConducteur): Promise<Conducteur[]> {
        return await this.conducteurRepository.findByDisponibilite(disponibilite);
    }
}