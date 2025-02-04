// infrastructure/repositories/entretien.repository.sql.ts

import { EntretienRepository } from '@application/repositories/EntretienRepository';
import { Entretien } from '@domain/entities/EntretienEntity';
import { UUID } from '@domain/value-objects/UUID';
import EntretienSQL from '../modelsSQL/entretien.sql';
import MotoSQL from '../modelsSQL/moto.sql';
import { Model, Op } from 'sequelize';


interface MotoAttributes {
  marque: string;
  model: string;
  serialNumber: string;
  userId: string;
}

interface EntretienAttributes {
  entretienId: string;
  motoId: string;
  typeEntretien: string;
  datePrevue: Date;
  dateRealisee: Date;
  kilometrageEntretien: number;
  recommandationsTechnicien: string;
  recommandationsGestionnaireClient: string;
  coutMainOeuvre: number;       // Remplacé cout par coutMainOeuvre
  coutPieces: number;          // Ajouté coutPieces
  statut: string;
  userId: string;
  gestionnaireId: string;
  moto?: MotoAttributes;
}

interface EntretienModel extends Model<EntretienAttributes>, EntretienAttributes {}

export class EntretienSQLRepository implements EntretienRepository {
  async save(entretien: Entretien): Promise<Entretien> {
    try {
      const saved = await EntretienSQL.create({
        entretienId: entretien.entretienId.toString(),
        motoId: entretien.motoId.toString(),
        typeEntretien: entretien.typeEntretien,
        datePrevue: entretien.datePrevue,
        dateRealisee: entretien.dateRealisee,
        kilometrageEntretien: entretien.kilometrageEntretien,
        recommandationsTechnicien: entretien.recommandationsTechnicien,
        recommandationsGestionnaireClient: entretien.recommandationsGestionnaireClient,
        coutMainOeuvre: entretien.coutMainOeuvre,  
        coutPieces: entretien.coutPieces,          
        statut: entretien.statut,
        userId: entretien.userId.toString(),
        gestionnaireId: entretien.gestionnaireId.toString(),
      });

      await saved.reload({
        include: [
          {
            model: MotoSQL,
            as: 'moto',
            required: false,
            attributes: ['marque', 'model', 'serialNumber']
          }
        ]
      });

      return this.toDomain(saved as EntretienModel);
    } catch (error) {
      throw new Error(`Erreur lors de la sauvegarde de l'entretien: ${error}`);
    }
  }

  async findById(entretienId: UUID): Promise<Entretien | null> {
    const entretien = await EntretienSQL.findByPk(entretienId.toString(), {
      include: [{
        model: MotoSQL,
        as: 'moto',
        attributes: ['marque', 'model', 'serialNumber']
      }]
    });
    
    if (!entretien) return null;
    return this.toDomain(entretien as EntretienModel);
  }

  async findAll(): Promise<Entretien[]> {
    const entretiens = await EntretienSQL.findAll({
      include: [{
        model: MotoSQL,
        as: 'moto',
        required: false,
        attributes: ['marque', 'model', 'serialNumber', 'userId']
      }]
    });
    
    return entretiens.map(entretien => this.toDomain(entretien as EntretienModel));
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
        coutMainOeuvre: entretien.coutMainOeuvre,  // Mise à jour
        coutPieces: entretien.coutPieces,          // Ajouté
        statut: entretien.statut,
        gestionnaireId: entretien.gestionnaireId.toString(),
        userId: entretien.userId.toString()      
      },
      { 
        where: { entretienId: entretien.entretienId.toString() }
      }
    );

    if (updatedCount === 0) {
      throw new Error("Entretien non trouvé");
    }

    const updated = await EntretienSQL.findByPk(entretien.entretienId.toString(), {
      include: [{
        model: MotoSQL,
        as: 'moto',
        attributes: ['marque', 'model', 'serialNumber']
      }]
    });

    if (!updated) {
      throw new Error("Entretien non trouvé après mise à jour");
    }

    return this.toDomain(updated as EntretienModel);
  }

  async delete(entretienId: UUID): Promise<boolean> {
    const deleted = await EntretienSQL.destroy({
      where: { entretienId: entretienId.toString() }
    });
    return deleted > 0;
  }

  async findAllEntretienDus(): Promise<Entretien[]> {
    const results = await EntretienSQL.findAll({
      where: {
        datePrevue: {
          [Op.lte]: new Date(), 
        },
        dateRealisee: null,
      },
    });
    return results.map(row => this.toDomain(row as EntretienModel));
  }


  private toDomain(model: EntretienModel): Entretien {
    return Entretien.create(
      new UUID(model.entretienId),
      new UUID(model.motoId),
      model.typeEntretien,
      model.datePrevue,
      model.dateRealisee,
      model.kilometrageEntretien,
      model.recommandationsTechnicien,
      model.recommandationsGestionnaireClient,
      model.statut,
      new UUID(model.userId),
      new UUID(model.gestionnaireId),
      model.coutMainOeuvre,
      model.coutPieces,     
      model.moto ? {
        marque: model.moto.marque,
        model: model.moto.model,
        serialNumber: model.moto.serialNumber
      } : undefined
    );
  }
}