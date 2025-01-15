// infrastructure/platforms/express/repositories/moto.repository.sql.ts
import { Moto } from '../../../../../domain/entities/MotoEntity';
import { MotoRepository } from '@application/repositories/MotoRepository';
import { UUID } from '../../../../../domain/value-objects/UUID';
import MotoSQL from '../modelsSQL/moto.sql';
import { Model } from 'sequelize';

// Interface pour le modèle Sequelize
interface MotoModel extends Model {
  motoId: string;
  marque: string;
  modele: string;
  kilometrage: number;
  dateMiseEnService: Date;
  statut: string;
  clientId: string;
}

export class SqlMotoRepository implements MotoRepository {
  async save(moto: Moto): Promise<Moto> {
    try {
      const createdMoto = await MotoSQL.create({
        motoId: moto.motoId.toString(),
        marque: moto.marque,
        modele: moto.modele,
        kilometrage: moto.kilometrage,
        dateMiseEnService: moto.dateMiseEnService,
        statut: moto.statut,
        clientId: moto.clientId.toString()
      });

      return Moto.create(
        new UUID(createdMoto.get('motoId') as string),
        createdMoto.get('marque') as string,
        createdMoto.get('modele') as string,
        createdMoto.get('kilometrage') as number,
        createdMoto.get('dateMiseEnService') as Date,
        createdMoto.get('statut') as string,
        new UUID(createdMoto.get('clientId') as string)
      );
    } catch (error) {
      throw new Error(`Erreur lors de la sauvegarde de la moto: ${error}`);
    }
  }

  async findById(motoId: UUID): Promise<Moto | null> {
    const moto = await MotoSQL.findByPk(motoId.toString()) as MotoModel | null;
    if (!moto) return null;

    return Moto.create(
      new UUID(moto.motoId),
      moto.marque,
      moto.modele,
      moto.kilometrage,
      moto.dateMiseEnService,
      moto.statut,
      new UUID(moto.clientId)
    );
  }

  async findAll(): Promise<Moto[]> {
    const motos = await MotoSQL.findAll() as MotoModel[];
    return motos.map(moto => Moto.create(
      new UUID(moto.motoId),
      moto.marque,
      moto.modele,
      moto.kilometrage,
      moto.dateMiseEnService,
      moto.statut,
      new UUID(moto.clientId)
    ));
  }


  async update(moto: Moto): Promise<Moto> {
    const updated = await MotoSQL.update(
      {
        marque: moto.marque,
        modele: moto.modele,
        kilometrage: moto.kilometrage,
        dateMiseEnService: moto.dateMiseEnService,
        statut: moto.statut,
        clientId: moto.clientId.toString()
      },
      {
        where: { motoId: moto.motoId.toString() }
      }
    );

    if (updated[0] === 0) {
      throw new Error('Moto non trouvée');
    }

    return moto;
  }

  async delete(motoId: UUID): Promise<boolean> {
    const deleted = await MotoSQL.destroy({
      where: { motoId: motoId.toString() }
    });
    return deleted > 0;
  }
}