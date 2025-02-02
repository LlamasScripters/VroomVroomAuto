import { Essai } from '../../../domain/entities/EssaiEntity';
import { EssaiRepository } from '../../repositories/EssaiRepository';
import { UUID } from '../../../domain/value-objects/UUID';

interface EssaiData {
  essaiId: UUID;
  motoId: UUID;
  ConducteurId: UUID;
  dateDebut: Date;
  dateFin: Date;
  duree: number;
  userId: UUID;
}

export class EssaiUseCases {
  constructor(private essaiRepository: EssaiRepository) {}

  async createEssai(motoId: UUID, ConducteurId: UUID, dateDebut: Date, dateFin: Date, duree: number, userId: UUID): Promise<Essai> {
    const essai = Essai.create(new UUID(), motoId, ConducteurId, dateDebut, dateFin, duree, userId);
    return this.essaiRepository.save(essai);
  }

  async getEssaiById(essaiId: UUID): Promise<Essai | null> {
    return this.essaiRepository.findById(essaiId);
  }

  async updateEssai(essaiId: UUID, updatedData: Partial<EssaiData>): Promise<Essai | null> {
    const essai = await this.essaiRepository.findById(essaiId);
    if (!essai) return null;
    
    const updatedEssai = Essai.create(
      essai.essaiId,
      updatedData.motoId || essai.motoId,
      updatedData.ConducteurId || essai.ConducteurId,
      updatedData.dateDebut || essai.dateDebut,
      updatedData.dateFin || essai.dateFin,
      updatedData.duree || essai.duree,
      essai.userId
    );

    return this.essaiRepository.save(updatedEssai);
  }

  async deleteEssai(essaiId: UUID): Promise<boolean> {
    return this.essaiRepository.delete(essaiId);
  }
}
