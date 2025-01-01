import { Moto } from '../../domain/entities/MotoEntity';
import { MotoRepository } from '../repositories/MotoRepository';
import { UUID } from '../../domain/value-objects/UUID';

export class MotoUseCases {
  constructor(private motoRepository: MotoRepository) {}

  async createMoto(motoId: UUID, marque: string, modele: string, kilometrage: number, dateMiseEnService: Date, statut: string, clientId: UUID): Promise<Moto> {
    const moto = Moto.create(motoId, marque, modele, kilometrage, dateMiseEnService, statut, clientId);
    return this.motoRepository.save(moto);
  }

  async getMotoById(motoId: UUID): Promise<Moto | null> {
    return this.motoRepository.findById(motoId);
  }

  async updateMoto(motoId: UUID, updatedData: Partial<Moto>): Promise<Moto | null> {
    const moto = await this.motoRepository.findById(motoId);
    if (!moto) return null;
    
    return this.motoRepository.save(moto);
  }

  async deleteMoto(motoId: UUID): Promise<boolean> {
    return this.motoRepository.delete(motoId);
  }
}
