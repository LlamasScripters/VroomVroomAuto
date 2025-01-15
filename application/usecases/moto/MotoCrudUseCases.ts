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
    const existingMoto = await this.motoRepository.findById(motoId);
    if (!existingMoto) return null;

    // Créer une nouvelle instance avec les données mises à jour
    const updatedMoto = Moto.create(
        motoId,
        updatedData.marque ?? existingMoto.marque,
        updatedData.model ?? existingMoto.model,
        updatedData.kilometrage ?? existingMoto.kilometrage,
        updatedData.dateMiseEnService ? new Date(updatedData.dateMiseEnService) : existingMoto.dateMiseEnService,
        updatedData.statut ?? existingMoto.statut,
        updatedData.serialNumber ?? existingMoto.serialNumber,
        existingMoto.clientId
    );
    
    return this.motoRepository.update(updatedMoto);
  }

  async deleteMoto(motoId: UUID): Promise<boolean> {
    return this.motoRepository.delete(motoId);
  }

  async getAllMotos(): Promise<Moto[]> {
    return this.motoRepository.findAll();
  }
}
