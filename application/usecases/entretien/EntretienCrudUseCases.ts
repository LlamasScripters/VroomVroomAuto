// application/usecases/entretien/EntretienCrudUseCases.ts

import { Entretien } from '@domain/entities/EntretienEntity';
import { EntretienRepository } from '@application/repositories/EntretienRepository';
import { UUID } from '@domain/value-objects/UUID';
import { CreateEntretienDTO, UpdateEntretienDTO, GetEntretienDTO } from '@application/dtos/EntretienDTO';
import { EntretienResponse } from '@application/response/EntretienResponse';

export class EntretienCrudUseCases {
  constructor(
    private entretienRepository: EntretienRepository
  ) {}

  async createEntretien(entretienData: CreateEntretienDTO): Promise<EntretienResponse> {
    const entretien = Entretien.create(
      new UUID(),
      new UUID(entretienData.motoId),
      entretienData.typeEntretien,
      new Date(entretienData.datePrevue),
      new Date(entretienData.dateRealisee),
      entretienData.kilometrageEntretien,
      entretienData.recommandationsTechnicien,
      entretienData.recommandationsGestionnaireClient,
      entretienData.statut,
      new UUID(entretienData.userId),
      new UUID(entretienData.gestionnaireId),
      entretienData.coutMainOeuvre || 0,  
      entretienData.coutPieces || 0,     
      undefined,                          
      entretienData.pieces || []          
    );
  
    try {
      const savedEntretien = await this.entretienRepository.save(entretien);
      return { entretienId: savedEntretien.entretienId.toString() };
    } catch (error) {
      throw error;
    }
  }

  async getEntretienById(entretienData: GetEntretienDTO): Promise<Entretien | null> {
    const entretienIdentifier = new UUID(entretienData.entretienId);
    return await this.entretienRepository.findById(entretienIdentifier);
  }

  async updateEntretien(updatedData: UpdateEntretienDTO): Promise<Entretien | null> {
    const entretienIdentifier = new UUID(updatedData.entretienId);
    const entretien = await this.entretienRepository.findById(entretienIdentifier);
    if (!entretien) return null;
  
    const updatedEntretien = Entretien.create(
      entretien.entretienId,
      updatedData.motoId ? new UUID(updatedData.motoId) : entretien.motoId,
      updatedData.typeEntretien ?? entretien.typeEntretien,
      updatedData.datePrevue ? new Date(updatedData.datePrevue) : entretien.datePrevue,
      updatedData.dateRealisee ? new Date(updatedData.dateRealisee) : entretien.dateRealisee,
      updatedData.kilometrageEntretien ?? entretien.kilometrageEntretien,
      updatedData.recommandationsTechnicien ?? entretien.recommandationsTechnicien,
      updatedData.recommandationsGestionnaireClient ?? entretien.recommandationsGestionnaireClient,
      updatedData.statut ?? entretien.statut,
      entretien.userId,
      updatedData.coutMainOeuvre ?? entretien.coutMainOeuvre, 
      updatedData.coutPieces ?? entretien.coutPieces,       
      entretien.gestionnaireId,
      entretien.motoDetails,
      entretien.pieces                                      
    );
      
    return await this.entretienRepository.update(updatedEntretien);
  }

  async deleteEntretien(entretienId: string): Promise<boolean> {
    const entretienIdentifier = new UUID(entretienId);
    return await this.entretienRepository.delete(entretienIdentifier);
  }

  async getAllEntretiens(): Promise<Entretien[]> {
    return await this.entretienRepository.findAll();
  }
}