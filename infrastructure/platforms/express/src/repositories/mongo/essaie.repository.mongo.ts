import { EssaiMongoRepository } from '@application/repositories/EssaiMongoRepository';
import { Essai } from '@domain/entities/EssaiEntity';
import { UUID } from '@domain/value-objects/UUID';
import { Model } from 'sequelize';
import EssaiMongo from '../../modelsMongo/essaie.mongo';

interface EssaiMongoAttributes {
    _id: string;
    moto: {
        _id: string;
    },
    conducteur: {
        _id: string;
    },
    dateDebut: Date;
    dateFin: Date;
    duree: number;
    user: {
        _id: string;
    }
}

interface EssaiMongoModel extends Model<EssaiMongoAttributes>, EssaiMongoAttributes {}

export class EssaiMgRepository implements EssaiMongoRepository {
    async save(essai: Essai): Promise<Essai> {
        try {
            const savedMongo = await EssaiMongo.create({
                _id: essai.essaiId.toString(),
                moto: {
                    _id: essai.motoId.toString()
                },
                conducteur: {
                    _id: essai.conducteurId.toString()
                },
                dateDebut: essai.dateDebut,
                dateFin: essai.dateFin,
                duree: essai.duree,
                user: {
                    _id: essai.userId.toString()
                }
            });

            return this.toDomain(savedMongo as unknown as EssaiMongoModel);
        } catch (error) {
            throw error;
        }
    }

    async findById(essaiId: UUID): Promise<Essai | null> {
        try {
            const found = await EssaiMongo.aggregate([
                { $match: { _id: essaiId.toString() } },
                {
                    $project: {
                        _id: 1,
                        moto: { _id: 1 },
                        conducteur: { _id: 1 },
                        dateDebut: 1,
                        dateFin: 1,
                        duree: 1,
                        user: { _id: 1 }
                    }
                }
            ]);

            if (!found) return null;

            return this.toDomain(found[0] as EssaiMongoModel);
        } catch (error) {
            throw error;
        }
    }

    async findAll(): Promise<Essai[]> {
        try {
            const essais = await EssaiMongo.find().select({
                _id: 1,
                moto: { _id: 1 },
                conducteur: { _id: 1 },
                dateDebut: 1,
                dateFin: 1,
                duree: 1,
                user: { _id: 1 }
            });

            if (!essais) return [];

            return essais.map(essai => this.toDomain(essai as unknown as EssaiMongoModel));
        } catch (error) {
            throw error;
        }
    }

    async findByConducteurId(conducteurId: UUID): Promise<Essai[]> {
        try {
            const essais = await EssaiMongo.find({
                'conducteur._id': conducteurId.toString()
            }).select({
                _id: 1,
                moto: { _id: 1 },
                conducteur: { _id: 1 },
                dateDebut: 1,
                dateFin: 1,
                duree: 1,
                user: { _id: 1 }
            });

            if (!essais) return [];

            return essais.map(essai => this.toDomain(essai as unknown as EssaiMongoModel));
        } catch (error) {
            throw error;
        }
    }

    async update(essai: Essai): Promise<Essai> {
        try {
            const updated = await EssaiMongo.findOneAndUpdate(
                { _id: essai.essaiId.toString() },
                {
                    moto: { _id: essai.motoId.toString() },
                    conducteur: { _id: essai.conducteurId.toString() },
                    dateDebut: essai.dateDebut,
                    dateFin: essai.dateFin,
                    duree: essai.duree,
                    user: { _id: essai.userId.toString() }
                },
                { new: true }
            );

            if (!updated) throw new Error('Essai not found or not updated');

            return this.toDomain(updated as unknown as EssaiMongoModel);
        } catch (error) {
            throw error;
        }
    }

    async delete(essaiId: UUID): Promise<boolean> {
        try {
            const deleted = await EssaiMongo.deleteOne({
                _id: essaiId.toString()
            });

            return deleted.deletedCount === 1;
        } catch (error) {
            throw error;
        }
    }

    private toDomain(essaiMongo: EssaiMongoModel): Essai {
        return new Essai(
            new UUID(essaiMongo._id),
            new UUID(essaiMongo.moto._id),
            new UUID(essaiMongo.conducteur._id),
            essaiMongo.dateDebut,
            essaiMongo.dateFin,
            essaiMongo.duree,
            new UUID(essaiMongo.user._id)
        );
    }
}