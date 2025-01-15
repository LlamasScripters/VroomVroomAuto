// infrastructure/platforms/express/src/repositories/entretien.repository.sql.ts
import { EntretienRepository } from '@application/repositories/EntretienRepository';
import { Entretien } from '@domain/entities/EntretienEntity';
import { UUID } from '@domain/value-objects/UUID';
import EntretienSQL from '../modelsSQL/entretien.sql';
import { Model } from 'sequelize';

interface EntretienAttributes {
  entretienId: string;
  motoId: string;
  typeEntretien: string;
  datePrevue: Date;
  dateRealisee: Date;
  kilometrageEntretien: number;
  recommandationsTechnicien: string;
  recommandationsGestionnaireClient: string;
  cout: number;
  statut: string;
  userId: string;
}

export interface EntretienModel extends Model<EntretienAttributes>, EntretienAttributes {}

export class EntretienSQLRepository implements EntretienRepository {
  async save(entretien: Entretien): Promise<Entretien> {
    const saved = await EntretienSQL.create({
      entretienId: entretien.entretienId.toString(),
      motoId: entretien.motoId.toString(),
      typeEntretien: entretien.typeEntretien,
      datePrevue: entretien.datePrevue,
      dateRealisee: entretien.dateRealisee,
      kilometrageEntretien: entretien.kilometrageEntretien,
      recommandationsTechnicien: entretien.recommandationsTechnicien,
      recommandationsGestionnaireClient: entretien.recommandationsGestionnaireClient,
      cout: entretien.cout,
      statut: entretien.statut,
      userId: entretien.userId.toString()
    });

    return this.toEntity(saved as EntretienModel);
  }

  async findById(entretienId: UUID): Promise<Entretien | null> {
    const entretien = await EntretienSQL.findByPk(entretienId.toString());
    if (!entretien) return null;
    return this.toEntity(entretien as EntretienModel);
  }

  async findAll(): Promise<Entretien[]> {
    const entretiens = await EntretienSQL.findAll();
    return entretiens.map(entretien => this.toEntity(entretien as EntretienModel));
  }

  async delete(entretienId: UUID): Promise<boolean> {
    const deleted = await EntretienSQL.destroy({
      where: { entretienId: entretienId.toString() }
    });
    return deleted > 0;
  }

  async update(entretien: Entretien): Promise<Entretien> {
    const [updatedCount] = await EntretienSQL.update(
      {
        motoId: entretien.motoId.toString(),
        typeEntretien: entretien.typeEntretien,
        datePrevue: entretien.datePrevue,
        dateRealisee: entretien.dateRealisee,
        kilometrageEntretien: entretien.kilometrageEntretien,
        recommandationsTechnicien: entretien.recommandationsTechnicien,
        recommandationsGestionnaireClient: entretien.recommandationsGestionnaireClient,
        cout: entretien.cout,
        statut: entretien.statut,
        userId: entretien.userId.toString()
      },
      { 
        where: { entretienId: entretien.entretienId.toString() },
        returning: true
      }
    );

    if (updatedCount === 0) {
      throw new Error("Entretien non trouvé");
    }

    const updated = await EntretienSQL.findByPk(entretien.entretienId.toString());
    if (!updated) {
      throw new Error("Entretien non trouvé après mise à jour");
    }

    return this.toEntity(updated as EntretienModel);
  }

  private toEntity(model: EntretienModel): Entretien {
    return Entretien.create(
      new UUID(model.entretienId),
      new UUID(model.motoId),
      model.typeEntretien,
      model.datePrevue,
      model.dateRealisee,
      model.kilometrageEntretien,
      model.recommandationsTechnicien,
      model.recommandationsGestionnaireClient,
      model.cout,
      model.statut,
      new UUID(model.userId)
    );
  }
}