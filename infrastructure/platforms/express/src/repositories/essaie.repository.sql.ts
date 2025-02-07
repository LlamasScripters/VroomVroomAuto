import { EssaiRepository } from "@application/repositories/EssaiRepository";
import { Essai } from "@domain/entities/EssaiEntity";
import { UUID } from "@domain/value-objects/UUID";
import { Model } from "sequelize";
import EssaiSQL from "../modelsSQL/essaie.sql";

interface EssaiAttributes {
    essaiId?: string;
    motoId: string;
    conducteurId: string;
    dateDebut: Date;
    dateFin: Date;
    duree: number;
    userId: string;
}

interface EssaiModel extends Model<EssaiAttributes>, EssaiAttributes {}

export class EssaiSQLRepository implements EssaiRepository {
    async save(essai: Essai): Promise<Essai> {
        try {
            const saved = await EssaiSQL.create({
                essaiId: essai.essaiId.toString(),
                motoId: essai.motoId.toString(),
                conducteurId: essai.conducteurId.toString(),
                dateDebut: essai.dateDebut,
                dateFin: essai.dateFin,
                duree: essai.duree,
                userId: essai.userId.toString()
            });

            return this.toDomain(saved as EssaiModel);
        } catch (error) {
            throw error;
        }
    }

    async findById(essaiId: UUID): Promise<Essai | null> {
        try {
            const found = await EssaiSQL.findByPk(essaiId.toString());

            if (!found) return null;

            return this.toDomain(found as EssaiModel);
        } catch (error) {
            throw error;
        }
    }

    async findAll(): Promise<Essai[]> {
        try {
            const essais = await EssaiSQL.findAll();

            return essais.map(essai => this.toDomain(essai as EssaiModel));
        } catch (error) {
            throw error;
        }
    }

    async update(essai: Essai): Promise<Essai> {
        try {
            const [updated] = await EssaiSQL.update({
                motoId: essai.motoId.toString(),
                conducteurId: essai.conducteurId.toString(),
                dateDebut: essai.dateDebut,
                dateFin: essai.dateFin,
                duree: essai.duree,
                userId: essai.userId.toString()
            }, {
                where: {
                    essaiId: essai.essaiId.toString()
                }
            });

            if (updated === 0) throw new Error('Essai not found or not updated');

            const updatedEssai = await this.findById(essai.essaiId);
            
            if (!updatedEssai) throw new Error('Essai not found after update');
            return updatedEssai;

        } catch (error) {
            throw error;
        }
    }

    async delete(essaiId: UUID): Promise<boolean> {
        try {
            const deleted = await EssaiSQL.destroy({
                where: {
                    essaiId: essaiId.toString()
                }
            });

            return deleted === 1;
        } catch (error) {
            throw error;
        }
    }

    private toDomain(essai: EssaiModel): Essai {
        return new Essai(
            new UUID(essai.essaiId),
            new UUID(essai.motoId),
            new UUID(essai.conducteurId),
            essai.dateDebut,
            essai.dateFin,
            essai.duree,
            new UUID(essai.userId)
        );
    }
}