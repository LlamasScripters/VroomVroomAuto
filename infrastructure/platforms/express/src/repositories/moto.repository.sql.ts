// infrastructure/repositories/moto.repository.sql.ts
import { Moto } from '@domain/entities/MotoEntity';
import { MotoRepository } from '@application/repositories/MotoRepository';
import { UUID } from '@domain/value-objects/UUID';
import MotoSQL from '../modelsSQL/moto.sql';
import { Model } from 'sequelize';

interface MotoModel extends Model {
  motoId: string;
  marque: string;
  model: string;
  kilometrage: number;
  dateMiseEnService: Date;
  statut: string;
  serialNumber: string;
  clientId: string;
}

export class SqlMotoRepository implements MotoRepository {
  async save(moto: Moto): Promise<Moto> {
    try {
      const createdMoto = await MotoSQL.create({
        motoId: moto.motoId.toString(),
        marque: moto.marque,
        model: moto.model,
        kilometrage: moto.kilometrage,
        dateMiseEnService: moto.dateMiseEnService,
        statut: moto.statut,
        serialNumber: moto.serialNumber,
        clientId: moto.clientId.toString()
      });

      return this.toDomain(createdMoto as MotoModel);
    } catch (error) {
      throw new Error(`Erreur lors de la sauvegarde de la moto: ${error}`);
    }
  }

  async findById(motoId: UUID): Promise<Moto | null> {
    const moto = await MotoSQL.findByPk(motoId.toString()) as MotoModel | null;
    if (!moto) return null;

    return this.toDomain(moto);
  }

  async findAll(): Promise<Moto[]> {
    const motos = await MotoSQL.findAll() as MotoModel[];
    return motos.map(moto => this.toDomain(moto));
  }

  async update(moto: Moto): Promise<Moto> {
    const [numberOfAffectedRows] = await MotoSQL.update(
      {
        marque: moto.marque,
        model: moto.model,
        kilometrage: moto.kilometrage,
        dateMiseEnService: moto.dateMiseEnService,
        statut: moto.statut,
        serialNumber: moto.serialNumber,
        clientId: moto.clientId.toString()
      },
      {
        where: { motoId: moto.motoId.toString() },
        returning: true
      }
    );

    if (numberOfAffectedRows === 0) {
      throw new Error('Moto non trouvée');
    }

    const updatedMoto = await MotoSQL.findByPk(moto.motoId.toString()) as MotoModel;
    return this.toDomain(updatedMoto);
  }

  async delete(motoId: UUID): Promise<boolean> {
    const deleted = await MotoSQL.destroy({
      where: { motoId: motoId.toString() }
    });
    return deleted > 0;
  }

  private toDomain(model: MotoModel): Moto {
    return Moto.create(
      new UUID(model.motoId),
      model.marque,
      model.model,
      model.kilometrage,
      model.dateMiseEnService,
      model.statut,
      model.serialNumber,
      new UUID(model.clientId)
    );
  }
}