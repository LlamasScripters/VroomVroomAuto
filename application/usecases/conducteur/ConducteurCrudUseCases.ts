import { Conducteur } from '../../../domain/entities/ConducteurEntity';
import { ConducteurRepository } from '../../repositories/ConducteurRepository';
import { UUID } from '../../../domain/value-objects/UUID';

interface ConducteurData {
  conducteurId: UUID;
  nom: string;
  permis: string;
  categoriePermis: string;
  experience: number;
  userId: UUID;
}

export class ConducteurUseCases {
  constructor(private conducteurRepository: ConducteurRepository) {}

  async createConducteur(nom: string, permis: string, categoriePermis: string, experience: number, userId: UUID): Promise<Conducteur> {
    const conducteur = Conducteur.create(new UUID(), nom, permis, categoriePermis, experience, userId);
    return this.conducteurRepository.save(conducteur);
  }

  async getConducteurById(conducteurId: UUID): Promise<Conducteur | null> {
    return this.conducteurRepository.findById(conducteurId);
  }

  async updateConducteur(conducteurId: UUID, updatedData: Partial<ConducteurData>): Promise<Conducteur | null> {
    const conducteur = await this.conducteurRepository.findById(conducteurId);
    if (!conducteur) return null;

    const updatedConducteur = Conducteur.create(
      conducteur.conducteurId,
      updatedData.nom || conducteur.nom,
      updatedData.permis || conducteur.permis,
      updatedData.categoriePermis || conducteur.categoriePermis,
      updatedData.experience || conducteur.experience,
      conducteur.userId
    );
    
    return this.conducteurRepository.save(updatedConducteur);
  }

  async deleteConducteur(conducteurId: UUID): Promise<boolean> {
    return this.conducteurRepository.delete(conducteurId);
  }
}
