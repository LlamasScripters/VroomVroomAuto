import { Essai } from '../../../domain/entities/EssaiEntity';
import { EssaiRepository } from '../../repositories/EssaiRepository';
import { EssaiMongoRepository } from '../../repositories/EssaiMongoRepository';
import { UUID } from '../../../domain/value-objects/UUID';
import { EssaiResponse } from '../../response/EssaiResponse';
import { CreateEssaiDTO, UpdateEssaiDTO, GetEssaiDTO } from '@application/dtos/EssaiDTO';


export class EssaiUseCases {
  constructor(
    private essaiRepository: EssaiRepository,
    private essaiMongoRepository: EssaiMongoRepository
  ) {}

  async createEssai(essaiData: CreateEssaiDTO): Promise<EssaiResponse> {
    const essai = Essai.create(
      new UUID(),
      new UUID (essaiData.motoId),
      new UUID (essaiData.conducteurId),
      new Date (essaiData.dateDebut),
      new Date (essaiData.dateFin),
      essaiData.duree,
      new UUID (essaiData.userId)
    );
    
    try {
      const savedEssai = await this.essaiRepository.save(essai);
      if (savedEssai) {
        await this.essaiMongoRepository.save(savedEssai);
      }
      
      return { essaiId: savedEssai.essaiId.toString() };
    } catch (error) {
      throw error;
    }
  }

  async getEssaiById(essaiData: GetEssaiDTO): Promise<Essai | null> {
    const essaiIdentifier = new UUID(essaiData.essaiId);
    return await this.essaiMongoRepository.findById(essaiIdentifier);
  }

  async getEssaisByConducteurId(conducteurId: string): Promise<Essai[]> {
    const conducteurIdentifier = new UUID(conducteurId);
    return await this.essaiMongoRepository.findByConducteurId(conducteurIdentifier);
  }

  async updateEssai(updatedData: UpdateEssaiDTO): Promise<Essai | null> {
    const essaiIdentifier = new UUID(updatedData.essaiId);
    const essai = await this.essaiRepository.findById(essaiIdentifier);
    if (!essai) return null;

    const updatedEssai = Essai.create(
      essai.essaiId,
      updatedData.motoId ? new UUID(updatedData.motoId) : essai.motoId,
      updatedData.conducteurId ? new UUID(updatedData.conducteurId) : essai.conducteurId,
      updatedData.dateDebut ? new Date(updatedData.dateDebut) : essai.dateDebut,
      updatedData.dateFin ? new Date(updatedData.dateFin) : essai.dateFin,
      updatedData.duree ?? essai.duree,
      essai.userId
    );

    await this.essaiRepository.update(updatedEssai);
    const updatedEssaiMongo = await this.essaiMongoRepository.update(updatedEssai);
    return updatedEssaiMongo ? updatedEssaiMongo : null;
  }

  async deleteEssai(essaiId: string): Promise<boolean> {
    const essaiIdentifier = new UUID(essaiId);
    const deletedFromRepository = await this.essaiRepository.delete(essaiIdentifier);
    if (deletedFromRepository) {
      await this.essaiMongoRepository.delete(essaiIdentifier);
    }
    return deletedFromRepository;
  }

  async listAllEssais(): Promise<Essai[]> {
    return await this.essaiMongoRepository.findAll();
  }

}
