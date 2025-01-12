import { Reparation } from '../../../domain/entities/ReparationEntity';
import { ReparationRepository } from '../../repositories/ReparationRepository';
import { UUID } from '../../../domain/value-objects/UUID';

interface ReparationData {
  reparationId: UUID;
  panneId: UUID;
  description: string;
  dateReparation: Date;
  actionsCorrectives: string[];
  coutReparation: number;
  status: string;
  userId: UUID;
}

export class ReparationUseCases {
  constructor(private reparationRepository: ReparationRepository) {}

  async createReparation(panneId: UUID,description: string,dateReparation: Date,actionsCorrectives: string[],coutReparation: number,status: string,userId: UUID): Promise<Reparation> {
    const reparation = Reparation.create(new UUID(), panneId, description, dateReparation, actionsCorrectives, coutReparation, status, userId);
    return this.reparationRepository.save(reparation);
  }

  async getReparationById(reparationId: UUID): Promise<Reparation | null> {
    return this.reparationRepository.findById(reparationId);
  }

  async updateReparation(reparationId: UUID, updatedData: Partial<ReparationData>): Promise<Reparation | null> {
    const reparation = await this.reparationRepository.findById(reparationId);
    if (!reparation) return null;

    const updatedReparation = Reparation.create(
      reparation.reparationId,
      updatedData.panneId || reparation.panneId,
      updatedData.description || reparation.description,
      updatedData.dateReparation || reparation.dateReparation,
      updatedData.actionsCorrectives || reparation.actionsCorrectives,
      updatedData.coutReparation || reparation.coutReparation,
      updatedData.status || reparation.status,
      reparation.userId
    );

    return this.reparationRepository.update(updatedReparation);
  }

  async deleteReparation(reparationId: UUID): Promise<boolean> {
    return this.reparationRepository.delete(reparationId);
  }

  async listAllReparations(): Promise<Reparation[]> {
    return this.reparationRepository.findAll();
  }
}