import { Panne } from '../../domain/entities/PanneEntity';
import { PanneRepository } from '../repositories/PanneRepository';
import { UUID } from '../../domain/value-objects/UUID';

export class PanneUseCases {
  constructor(private panneRepository: PanneRepository) {}

  async createPanne(
    panneId: UUID,
    motoId: UUID,
    description: string,
    date: Date,
    actionCorrective: string,
    status: string,
    userId: UUID
  ): Promise<Panne> {
    const panne = Panne.create(panneId, motoId, description, date, actionCorrective, status, userId);
    return this.panneRepository.save(panne);
  }

  async getPanneById(panneId: UUID): Promise<Panne | null> {
    return this.panneRepository.findById(panneId);
  }

  async updatePanne(panneId: UUID, updatedData: Partial<Panne>): Promise<Panne | null> {
    const panne = await this.panneRepository.findById(panneId);
    if (!panne) return null;

    const updatedPanne = { ...panne, ...updatedData } as Panne;
    return this.panneRepository.update(updatedPanne);
  }

  async deletePanne(panneId: UUID): Promise<boolean> {
    return this.panneRepository.delete(panneId);
  }

  async listAllPannes(): Promise<Panne[]> {
    return this.panneRepository.findAll();
  }
}
