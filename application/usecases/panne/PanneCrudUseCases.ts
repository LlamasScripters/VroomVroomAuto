import { Panne } from '@domain/entities/PanneEntity';
import { PanneRepository } from '@application/repositories/PanneRepository';
import { PanneMongoRepository } from '@application/repositories/PanneMongoRepository';
import { UUID } from '@domain/value-objects/UUID';
import { CreatePanneDTO, UpdatePanneDTO, GetPanneDTO } from '@application/dtos/PanneDTO';
import { PanneResponse } from '@application/response/PanneResponse';


export class PanneUseCases {
  constructor(
    private panneRepository: PanneRepository,
    private panneMongoRepository: PanneMongoRepository
  ) {}

  async createPanne(panneData: CreatePanneDTO): Promise<PanneResponse> {
    const panne = Panne.create(
      new UUID(),
      new UUID(panneData.motoId),
      panneData.description,
      panneData.date,
      panneData.actionCorrective,
      panneData.status,
      new UUID(panneData.userId)
    );
    
    try {
      const savedPanne = await this.panneRepository.save(panne);
      if (savedPanne) {
        await this.panneMongoRepository.save(savedPanne);
      }
      
      return { panneId: savedPanne.panneId.toString() };
    } catch (error) {
      throw error;
    }
  }

  async getPanneById(panneData: GetPanneDTO): Promise<Panne | null> {
    const panneIdentifier = new UUID(panneData.panneId);
    return await this.panneMongoRepository.findById(panneIdentifier);
  }

  async updatePanne(updatedData: UpdatePanneDTO): Promise<Panne | null> {
    const panneIdentifier = new UUID(updatedData.panneId);
    const panne = await this.panneRepository.findById(panneIdentifier);
    if (!panne) return null;

    const updatedPanne = Panne.create(
      panne.panneId,
      updatedData.motoId ? new UUID(updatedData.motoId) : panne.motoId,
      updatedData.description ?? panne.description,
      updatedData.date ? new Date(updatedData.date) : panne.date,
      updatedData.actionCorrective ?? panne.actionCorrective,
      updatedData.status ?? panne.status,
      panne.userId
    );

    await this.panneRepository.update(updatedPanne);
    const updatedPanneMongo = await this.panneMongoRepository.update(updatedPanne);
    return updatedPanneMongo ? updatedPanneMongo : null;
      
  }

  async deletePanne(panneId: string): Promise<boolean> {
    const panneIdentifier = new UUID(panneId);
    const deletedFromRepository = await this.panneRepository.delete(panneIdentifier);
    if (deletedFromRepository) {
      await this.panneMongoRepository.delete(panneIdentifier);
    }
    return deletedFromRepository;
  }

  async listAllPannes(): Promise<Panne[]> {
    return this.panneMongoRepository.findAll();
  }
}
