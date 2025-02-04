import { GarantieRepository } from "@application/repositories/GarantieRepository";
import { Garantie } from "@domain/entities/GarantieEntity";
import { UUID } from "@domain/value-objects/UUID";
import { Model } from "sequelize";
import GarantieSQL from "../modelsSQL/garantie.sql";

interface GarantieAttributes {
    garantieId?: string;
    panneId: string;
    motoId: string;
    couverture: string;
    type: string;
    dateDebut: Date;
    dateFin: Date;
    statut: string;
}

interface GarantieModel extends Model<GarantieAttributes>, GarantieAttributes {}

export class GarantieSQLRepository implements GarantieRepository {
    async save(garantie: Garantie): Promise<Garantie> {
        try {
            const saved = await GarantieSQL.create({
                garantieId: garantie.garantieId.toString(),
                panneId: garantie.panneId.toString(),
                motoId: garantie.motoId.toString(),
                couverture: garantie.couverture,
                type: garantie.type,
                dateDebut: garantie.dateDebut,
                dateFin: garantie.dateFin,
                statut: garantie.statut
            });

            return this.toDomain(saved as GarantieModel);
        } catch (error) {
            throw error;
        }
    }

    async findById(garantieId: UUID): Promise<Garantie | null> {
        try {
            const found = await GarantieSQL.findByPk(garantieId.toString());

            if (!found) return null;

            return this.toDomain(found as GarantieModel);
        } catch (error) {
            throw error;
        }
    }

    async findAll(): Promise<Garantie[]> {
        try {
            const garanties = await GarantieSQL.findAll();

            return garanties.map(garantie => this.toDomain(garantie as GarantieModel));
        } catch (error) {
            throw error;
        }
    }

    async update(garantie: Garantie): Promise<Garantie> {
        try {
            const [updated] = await GarantieSQL.update({
                panneId: garantie.panneId.toString(),
                motoId: garantie.motoId.toString(),
                couverture: garantie.couverture,
                type: garantie.type,
                dateDebut: garantie.dateDebut,
                dateFin: garantie.dateFin,
                statut: garantie.statut
            }, {
                where: { 
                    garantieId: garantie.garantieId.toString() 
                }
            });

            if (updated === 0) throw new Error('Garantie not found or not updated');

            const updatedGarantie = await this.findById(garantie.garantieId);

            if (!updatedGarantie) throw new Error('Garantie not found after update');
            return updatedGarantie;

        } catch (error) {
            throw error;
        }
    }

    async delete(garantieId: UUID): Promise<boolean> {
        try {
            const deleted = await GarantieSQL.destroy({ 
                where: {
                     garantieId: garantieId.toString() 
                    } 
                });

            return deleted === 1;
        } catch (error) {
            throw error;
        }
    }

    private toDomain(garantie: GarantieModel): Garantie {
        return new Garantie(
            new UUID(garantie.garantieId),
            new UUID(garantie.panneId),
            new UUID(garantie.motoId),
            garantie.couverture,
            garantie.type,
            garantie.dateDebut,
            garantie.dateFin,
            garantie.statut
        );
    }
}