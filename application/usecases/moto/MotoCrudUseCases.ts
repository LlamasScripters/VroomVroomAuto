import { Moto } from '../../../domain/entities/MotoEntity';
import { MotoRepository } from '../../repositories/MotoRepository';
import { UUID } from '../../../domain/value-objects/UUID';
import { CreateMotoDTO, UpdateMotoDTO, GetMotoDTO } from '@application/dtos/MotoDTO';
import { MotoResponse } from '@application/response/MotoResponse';

export class MotoCrudUseCases {
  constructor(
    private motoRepository: MotoRepository
  ) {}

  async createMoto(motoData: CreateMotoDTO): Promise<MotoResponse> {
    const moto = Moto.create(
      new UUID(),
      motoData.marque,
      motoData.model,
      motoData.kilometrage,
      new Date(motoData.dateMiseEnService),
      motoData.statut,
      motoData.serialNumber,
      new UUID(motoData.clientId)
    );

    try {
      const savedMoto = await this.motoRepository.save(moto);
      return { motoId: savedMoto.motoId.toString() };
    } catch (error) {
      throw error;
    }
  }

  async getMotoById(motoData: GetMotoDTO): Promise<Moto | null> {
    const motoIdentifier = new UUID(motoData.motoId);
    return await this.motoRepository.findById(motoIdentifier);
  }

  async updateMoto(updatedData: UpdateMotoDTO): Promise<Moto | null> {
    const motoIdentifier = new UUID(updatedData.motoId);
    const moto = await this.motoRepository.findById(motoIdentifier);
    if (!moto) return null;

    const updatedMoto = Moto.create(
      moto.motoId,
      updatedData.marque ?? moto.marque,
      updatedData.model ?? moto.model,
      updatedData.kilometrage ?? moto.kilometrage,
      updatedData.dateMiseEnService ? new Date(updatedData.dateMiseEnService) : moto.dateMiseEnService,
      updatedData.statut ?? moto.statut,
      updatedData.serialNumber ?? moto.serialNumber,
      updatedData.clientId ? new UUID(updatedData.clientId) : moto.clientId
    );
    
    return await this.motoRepository.update(updatedMoto);
  }

  async deleteMoto(motoId: string): Promise<boolean> {
    const motoIdentifier = new UUID(motoId);
    return await this.motoRepository.delete(motoIdentifier);
  }

  async getAllMotos(): Promise<Moto[]> {
    return await this.motoRepository.findAll();
  }
}