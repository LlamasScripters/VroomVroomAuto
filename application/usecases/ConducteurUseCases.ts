import { Conducteur } from '../../domain/entities/ConducteurEntity';
import { ConducteurRepository } from '../repositories/ConducteurRepository';
import { UUID } from '../../domain/value-objects/UUID';

export class ConducteurUseCases {
  constructor(private conducteurRepository: ConducteurRepository) {}

  async createConducteur(conducteurId: UUID, nom: string, permis: string, categoriePermis: string, experience: number, userId: UUID): Promise<Conducteur> {
    const conducteur = Conducteur.create(conducteurId, nom, permis, categoriePermis, experience, userId);
    return this.conducteurRepository.save(conducteur);
  }

  async getConducteurById(conducteurId: UUID): Promise<Conducteur | null> {
    return this.conducteurRepository.findById(conducteurId);
  }

  async updateConducteur(conducteurId: UUID, updatedData: Partial<Conducteur>): Promise<Conducteur | null> {
    const conducteur = await this.conducteurRepository.findById(conducteurId);
    if (!conducteur) return null;
    
    return this.conducteurRepository.save(conducteur);
  }

  async deleteConducteur(conducteurId: UUID): Promise<boolean> {
    return this.conducteurRepository.delete(conducteurId);
  }
}
