import { PanneMongoRepository } from '@application/repositories/PanneMongoRepository';
import { Panne } from '@domain/entities/PanneEntity';
import { UUID } from '@domain/value-objects/UUID';
import { Model } from 'sequelize';
import PanneMongo from '../../modelsMongo/panne.mongo';

interface PanneMongoAttributes {
    _id: string;
    moto: {
        _id: string;
    },
    description: string;
    date: Date;
    actionCorrective: string;
    status: string;
    user: {
        _id: string;
    }
}

interface PanneMongoModel extends Model<PanneMongoAttributes>, PanneMongoAttributes { }

export class PanneMgRepository implements PanneMongoRepository {
    async save(panne: Panne): Promise<Panne> {
        try {
            const savedMongo = await PanneMongo.create({
                _id: panne.panneId.toString(),
                moto: {
                    _id: panne.motoId.toString()
                },
                description: panne.description,
                date: panne.date,
                actionCorrective: panne.actionCorrective,
                status: panne.status,
                user: {
                    _id: panne.userId.toString()
                }
            });

            return this.toDomain(savedMongo as unknown as PanneMongoModel);
        } catch (error) {
            throw error;
        }
    }

    async findById(panneId: UUID): Promise<Panne | null> {
        try {
            const found = await PanneMongo.aggregate([
                { $match: { _id: panneId.toString() } },
                {
                    $project: {
                        _id: 1,
                        moto: { _id: 1 },
                        description: 1,
                        date: 1,
                        actionCorrective: 1,
                        status: 1,
                        user: { _id: 1 }
                    }
                }
            ]);

            if (!found) return null;

            return this.toDomain(found[0] as PanneMongoModel);
        } catch (error) {
            throw error;
        }
    }

    async findAll(): Promise<Panne[]> {
        try {
            const pannes = await PanneMongo.find().select({
                _id: 1,
                moto: { _id: 1 },
                description: 1,
                date: 1,
                actionCorrective: 1,
                status: 1,
                user: { _id: 1 }
            });

            if (!pannes) return [];

            return pannes.map(panne => this.toDomain(panne as unknown as PanneMongoModel));
        } catch (error) {
            throw error;
        }
    }

    async update(panne: Panne): Promise<Panne> {
        try {
            const updated = await PanneMongo.findOneAndUpdate(
                { _id: panne.panneId.toString() },
                {
                    moto: { _id: panne.motoId.toString() },
                    description: panne.description,
                    date: panne.date,
                    actionCorrective: panne.actionCorrective,
                    status: panne.status,
                    user: { _id: panne.userId.toString() }
                },
                { new: true }
            );

            if (!updated) throw new Error('Panne not found or not updated');

            return this.toDomain(updated as unknown as PanneMongoModel);
        } catch (error) {
            throw error;
        }
    }

    async delete(panneId: UUID): Promise<boolean> {
        try {
            const deleted = await PanneMongo.deleteOne({
                _id: panneId.toString()
            });

            return deleted.deletedCount === 1;
        } catch (error) {
            throw error;
        }
    }

    private toDomain(panneMongo: PanneMongoModel): Panne {
        return new Panne(
            new UUID(panneMongo._id),
            new UUID(panneMongo.moto._id),
            panneMongo.description,
            panneMongo.date,
            panneMongo.actionCorrective,
            panneMongo.status,
            new UUID(panneMongo.user._id)
        );
    }

}


