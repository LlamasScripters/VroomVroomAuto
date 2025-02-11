import { Garantie } from '@domain/entities/GarantieEntity';
import { UUID } from '@domain/value-objects/UUID';

export interface GarantieRepository {
    save(garantie: Garantie): Promise<Garantie>;
    findById(garantieId: UUID): Promise<Garantie | null>;
    delete(garantieId: UUID): Promise<boolean>;
    findAll(): Promise<Garantie[]>;
    update(garantie: Garantie): Promise<Garantie>;
}