import { Essai } from '../../domain/entities/EssaiEntity';
import { EssaiRepository } from '../repositories/EssaiRepository';
import { UUID } from '../../domain/value-objects/UUID';

export class EssaiUseCases {
  constructor(private essaiRepository: EssaiRepository) {}

  async createEssai(essaiId: UUID, motoId: UUID, ConducteurId: UUID, dateDebut: Date, dateFin: Date, duree: number, userId: UUID): Promise<Essai> {
    const essai = Essai.create(essaiId, motoId, ConducteurId, dateDebut, dateFin, duree, userId);
    return this.essaiRepository.save(essai);
  }

  async getEssaiById(essaiId: UUID): Promise<Essai | null> {
    return this.essaiRepository.findById(essaiId);
  }

  async updateEssai(essaiId: UUID, updatedData: Partial<Essai>): Promise<Essai | null> {
    const essai = await this.essaiRepository.findById(essaiId);
    if (!essai) return null;
    
    return this.essaiRepository.save(essai);
  }

  async deleteEssai(essaiId: UUID): Promise<boolean> {
    return this.essaiRepository.delete(essaiId);
  }
}
