import { Entretien } from '../../../domain/entities/EntretienEntity';
import { EntretienRepository } from '../../repositories/EntretienRepository';
import { UUID } from '../../../domain/value-objects/UUID';

interface EntretienData {
  entretienId: UUID;
  motoId: UUID;
  typeEntretien: string;
  datePrevue: Date;
  dateRealisee: Date;
  kilometrageEntretien: number;
  recommandationsTechnicien: string;
  recommandationsGestionnaireClient: string;
  cout: number;
  statut: string;
  userId: UUID;
}

export class EntretienUseCases {
  constructor(private entretienRepository: EntretienRepository) {}

  async createEntretien(motoId: UUID, typeEntretien: string, datePrevue: Date, dateRealisee: Date, kilometrageEntretien: number, recommandationsTechnicien: string, recommandationsGestionnaireClient: string, cout: number, statut: string, userId: UUID): Promise<Entretien> {
    const entretien = Entretien.create(new UUID(), motoId, typeEntretien, datePrevue, dateRealisee, kilometrageEntretien, recommandationsTechnicien, recommandationsGestionnaireClient, cout, statut, userId);
    return this.entretienRepository.save(entretien);
  }

  async getEntretienById(entretienId: UUID): Promise<Entretien | null> {
    return this.entretienRepository.findById(entretienId);
  }

  async updateEntretien(entretienId: UUID, updatedData: Partial<EntretienData>): Promise<Entretien | null> {
    const entretien = await this.entretienRepository.findById(entretienId);
    if (!entretien) return null;

    const updatedEntretien = Entretien.create(
      entretien.entretienId,
      updatedData.motoId || entretien.motoId,
      updatedData.typeEntretien || entretien.typeEntretien,
      updatedData.datePrevue || entretien.datePrevue,
      updatedData.dateRealisee || entretien.dateRealisee,
      updatedData.kilometrageEntretien || entretien.kilometrageEntretien,
      updatedData.recommandationsTechnicien || entretien.recommandationsTechnicien,
      updatedData.recommandationsGestionnaireClient || entretien.recommandationsGestionnaireClient,
      updatedData.cout || entretien.cout,
      updatedData.statut || entretien.statut,
      entretien.userId
    );
    
    return this.entretienRepository.save(updatedEntretien);
  }

  async deleteEntretien(entretienId: UUID): Promise<boolean> {
    return this.entretienRepository.delete(entretienId);
  }
}
