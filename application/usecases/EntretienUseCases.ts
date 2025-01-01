import { Entretien } from '../../domain/entities/EntretienEntity';
import { EntretienRepository } from '../../application/repositories/EntretienRepository';
import { UUID } from '../../domain/value-objects/UUID';

export class EntretienUseCases {
  constructor(private entretienRepository: EntretienRepository) {}

  async createEntretien(entretienId: UUID, motoId: UUID, typeEntretien: string, datePrevue: Date, dateRealisee: Date, kilometrageEntretien: number, recommandationsTechnicien: string, recommandationsGestionnaireClient: string, cout: number, statut: string, userId: UUID): Promise<Entretien> {
    const entretien = Entretien.create(entretienId, motoId, typeEntretien, datePrevue, dateRealisee, kilometrageEntretien, recommandationsTechnicien, recommandationsGestionnaireClient, cout, statut, userId);
    return this.entretienRepository.save(entretien);
  }

  async getEntretienById(entretienId: UUID): Promise<Entretien | null> {
    return this.entretienRepository.findById(entretienId);
  }

  async updateEntretien(entretienId: UUID, updatedData: Partial<Entretien>): Promise<Entretien | null> {
    const entretien = await this.entretienRepository.findById(entretienId);
    if (!entretien) return null;
    
    return this.entretienRepository.save(entretien);
  }

  async deleteEntretien(entretienId: UUID): Promise<boolean> {
    return this.entretienRepository.delete(entretienId);
  }
}
