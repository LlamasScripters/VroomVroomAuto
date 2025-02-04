import { GarantieMongoRepository } from "@application/repositories/GarantieMongoRepository";
import { Garantie } from "@domain/entities/GarantieEntity";
import { UUID } from "@domain/value-objects/UUID";
import { Model } from "sequelize";
import GarantieMongo from "../../modelsMongo/garantie.mongo";

interface GarantieMongoAttributes {
    _id: string;
    panne: {
        _id: string;
    },
    moto: {
        _id: string;
    },
    couverture: string;
    type: string;
    dateDebut: Date;
    dateFin: Date;
    statut: string;
}

interface GarantieMongoModel extends Model<GarantieMongoAttributes>, GarantieMongoAttributes {}

export class GarantieMgRepository implements GarantieMongoRepository {
    async save(garantie: Garantie): Promise<Garantie> {
        try {
            const savedMongo = await GarantieMongo.create({
                _id: garantie.garantieId.toString(),
                panne: {
                    _id: garantie.panneId.toString()
                },
                moto: {
                    _id: garantie.motoId.toString()
                },
                couverture: garantie.couverture,
                type: garantie.type,
                dateDebut: garantie.dateDebut,
                dateFin: garantie.dateFin,
                statut: garantie.statut
            });
            
            return this.toDomain(savedMongo as unknown as GarantieMongoModel);
        } catch (error) {
            throw error;
        }
    }

    async findById(garantieId: UUID): Promise<Garantie | null> {
        try {
            const found = await GarantieMongo.aggregate([
                { $match: { _id: garantieId.toString() } },
                {
                    $project: {
                        _id: 1,
                        panne: { _id: 1 },
                        moto: { _id: 1 },
                        couverture: 1,
                        type: 1,
                        dateDebut: 1,
                        dateFin: 1,
                        statut: 1
                    }
                }
            ]);

            if (!found) return null;

            return this.toDomain(found[0] as GarantieMongoModel);
        } catch (error) {
            throw error;
        }
    }

    async findAll(): Promise<Garantie[]> {
        try {
            const garanties = await GarantieMongo.aggregate([
                {
                    $project: {
                        _id: 1,
                        panne: { _id: 1 },
                        moto: { _id: 1 },
                        couverture: 1,
                        type: 1,
                        dateDebut: 1,
                        dateFin: 1,
                        statut: 1
                    }
                }
            ]);

            return garanties.map(garantie => this.toDomain(garantie as GarantieMongoModel));
        } catch (error) {
            throw error;
        }
    }

    async update(garantie: Garantie): Promise<Garantie> {
        try {
            const updated = await GarantieMongo.updateOne({
                _id: garantie.garantieId.toString()
            }, {
                panne: {
                    _id: garantie.panneId.toString()
                },
                moto: {
                    _id: garantie.motoId.toString()
                },
                couverture: garantie.couverture,
                type: garantie.type,
                dateDebut: garantie.dateDebut,
                dateFin: garantie.dateFin,
                statut: garantie.statut
            });

            if (!updated) throw new Error('Garantie not found or not updated');

            return this.toDomain(updated as unknown as GarantieMongoModel);
        } catch (error) {
            throw error;
        }
    }

    async delete(garantieId: UUID): Promise<boolean> {
        try {
            const deleted = await GarantieMongo.deleteOne({
                _id: garantieId.toString()
            });

            return deleted.deletedCount === 1;
        } catch (error) {
            throw error;
        }
    }

    private toDomain(garantie: GarantieMongoModel): Garantie {
        return Garantie.create(
            new UUID(garantie._id),
            new UUID(garantie.panne._id),
            new UUID(garantie.moto._id),
            garantie.couverture,
            garantie.type,
            garantie.dateDebut,
            garantie.dateFin,
            garantie.statut
        );
    }

}