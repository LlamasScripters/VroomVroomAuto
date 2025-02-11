import { Garantie } from '@domain/entities/GarantieEntity';
import { GarantieRepository } from '@application/repositories/GarantieRepository';
import { GarantieMongoRepository } from '@application/repositories/GarantieMongoRepository';
import { UUID } from '@domain/value-objects/UUID';
import { CreateGarantieDTO, UpdateGarantieDTO, GetGarantieDTO } from '@application/dtos/GarantieDTO';
import { GarantieResponse } from '@application/response/GarantieResponse';


export class GarantieUseCases {
    constructor(
        private garantieRepository: GarantieRepository,
        private garantieMongoRepository: GarantieMongoRepository
    ) {}

    async createGarantie(garantieData: CreateGarantieDTO): Promise<GarantieResponse> {
        const garantie = Garantie.create(
            new UUID(),
            new UUID(garantieData.panneId),
            new UUID(garantieData.motoId),
            garantieData.couverture,
            garantieData.type,
            garantieData.dateDebut,
            garantieData.dateFin,
            garantieData.statut
        );
        
        try {
            const savedGarantie = await this.garantieRepository.save(garantie);
            if (savedGarantie) {
                await this.garantieMongoRepository.save(savedGarantie);
            }
            
            return { garantieId: savedGarantie.garantieId.toString() };
        } catch (error) {
            throw error;
        }
    }

    async getGarantieById(garantieData: GetGarantieDTO): Promise<Garantie | null> {
        const garantieIdentifier = new UUID(garantieData.garantieId);
        return await this.garantieMongoRepository.findById(garantieIdentifier);
    }

    async updateGarantie(updatedData: UpdateGarantieDTO): Promise<Garantie | null> {
        const garantieIdentifier = new UUID(updatedData.garantieId);
        const garantie = await this.garantieRepository.findById(garantieIdentifier);
        if (!garantie) return null;

        const updatedGarantie = Garantie.create(
            garantie.garantieId,
            updatedData.panneId ? new UUID(updatedData.panneId) : garantie.panneId,
            updatedData.motoId ? new UUID(updatedData.motoId) : garantie.motoId,
            updatedData.couverture ?? garantie.couverture,
            updatedData.type ?? garantie.type,
            updatedData.dateDebut ? new Date(updatedData.dateDebut) : garantie.dateDebut,
            updatedData.dateFin ? new Date(updatedData.dateFin) : garantie.dateFin,
            updatedData.statut ?? garantie.statut
        );

        await this.garantieRepository.update(updatedGarantie);
        const updatedGarantieMongo = await this.garantieMongoRepository.update(updatedGarantie);
        return updatedGarantieMongo ? updatedGarantieMongo : null;
    }

    async deleteGarantie(garantieId: string): Promise<boolean> {
        const garantieIdentifier = new UUID(garantieId);
        const deletedFromRepository = await this.garantieRepository.delete(garantieIdentifier);
        if(deletedFromRepository) {
            return await this.garantieMongoRepository.delete(garantieIdentifier);
        }
        return deletedFromRepository;
    }

    async listAllGaranties(): Promise<Garantie[]> {
        return await this.garantieMongoRepository.findAll();
    }
}