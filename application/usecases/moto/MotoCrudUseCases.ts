import { Moto } from '../../../domain/entities/MotoEntity';
import { MotoRepository } from '../../repositories/MotoRepository';
import { UUID } from '../../../domain/value-objects/UUID';

interface MotoData {
  motoId: UUID;
  marque: string;
  model: string;
  kilometrage: number;
  dateMiseEnService: Date;
  statut: string;
  serialNumber: string;
  clientId: UUID;
}

export class MotoUseCases {
  constructor(private motoRepository: MotoRepository) {}

  async createMoto(marque: string, model: string, kilometrage: number, dateMiseEnService: Date, statut: string, serialNumber: string, clientId: UUID): Promise<Moto> {
    const moto = Moto.create(new UUID(), marque, model, kilometrage, dateMiseEnService, statut, serialNumber, clientId);
    return this.motoRepository.save(moto);
  }

  async getMotoById(motoId: UUID): Promise<Moto | null> {
    return this.motoRepository.findById(motoId);
  }

  async updateMoto(motoId: UUID, updatedData: Partial<MotoData>): Promise<Moto | null> {
    const moto = await this.motoRepository.findById(motoId);
    if (!moto) return null;

    const updatedMoto = Moto.create(
      moto.motoId,
      updatedData.marque || moto.marque,
      updatedData.model || moto.model,
      updatedData.kilometrage || moto.kilometrage,
      updatedData.dateMiseEnService || moto.dateMiseEnService,
      updatedData.statut || moto.statut,
      updatedData.serialNumber || moto.serialNumber,
      moto.clientId
    );
    
    return this.motoRepository.save(updatedMoto);
  }

  async deleteMoto(motoId: UUID): Promise<boolean> {
    return this.motoRepository.delete(motoId);
  }

  async getAllMotos(): Promise<Moto[]> {
    return this.motoRepository.findAll();
  }
}
