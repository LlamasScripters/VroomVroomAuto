import { PanneRepository } from '@application/repositories/PanneRepository';
import { Panne } from '@domain/entities/PanneEntity';
import { UUID } from '@domain/value-objects/UUID';
import { Model } from 'sequelize';
import PanneSQL from '../modelsSQL/panne.sql';

interface PanneAttributes {
    panneId?: string;
    motoId: string;
    description: string;
    date: Date;
    actionCorrective: string;
    status: string;
    userId: string;
}

interface PanneModel extends Model<PanneAttributes>, PanneAttributes { }

export class PanneSQLRepository implements PanneRepository {
    async save(panne: Panne): Promise<Panne> {
        try {
            const saved = await PanneSQL.create({
                panneId: panne.panneId.toString(),
                motoId: panne.motoId.toString(),
                description: panne.description,
                date: panne.date,
                actionCorrective: panne.actionCorrective,
                status: panne.status,
                userId: panne.userId.toString()
            });

            return this.toDomain(saved as PanneModel);
        } catch (error) {
            throw error;
        }
    }

    async findById(panneId: UUID): Promise<Panne | null> {
        try {
            const found = await PanneSQL.findByPk(panneId.toString());

            if (!found) return null;

            return this.toDomain(found as PanneModel);
        } catch (error) {
            throw error;
        }
    }

    async findAll(): Promise<Panne[]> {
        try {
            const pannes = await PanneSQL.findAll();

            return pannes.map(panne => this.toDomain(panne as PanneModel));
        } catch (error) {
            throw error;
        }
    }

    async update(panne: Panne): Promise<Panne> {
        try {
            const [updated] = await PanneSQL.update({
                motoId: panne.motoId.toString(),
                description: panne.description,
                date: panne.date,
                actionCorrective: panne.actionCorrective,
                status: panne.status,
                userId: panne.userId.toString()
            }, {
                where: {
                    panneId: panne.panneId.toString()
                }
            });

            if (updated === 0) throw new Error('Panne not found or not updated');

            const updatedPanne = await this.findById(panne.panneId);

            if (!updatedPanne) throw new Error('Panne not found after update');
            return updatedPanne;

        } catch (error) {
            throw error;
        }
    }

    async delete(panneId: UUID): Promise<boolean> {
        try {
            const deleted = await PanneSQL.destroy({
                where: {
                    panneId: panneId.toString()
                }
            });

            return deleted === 1;
        } catch (error) {
            throw error;
        }
    }

    private toDomain(panne: PanneModel): Panne {
        return new Panne(
            new UUID(panne.panneId),
            new UUID(panne.motoId),
            panne.description,
            panne.date,
            panne.actionCorrective,
            panne.status,
            new UUID(panne.userId)
        );
    }

}


