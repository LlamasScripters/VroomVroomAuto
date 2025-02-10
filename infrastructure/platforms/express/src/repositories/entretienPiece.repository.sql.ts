import { EntretienPieceRepository } from '@application/repositories/EntretienPieceRepository';
import { EntretienPiece } from '@domain/entities/EntretienPieceEntity';
import { UUID } from '@domain/value-objects/UUID';
import EntretienPieceSQL from '../modelsSQL/entretienPiece.sql';
import { Model } from 'sequelize';

interface EntretienPieceAttributes {
  entretienPieceId: string;
  entretienId: string;
  pieceId: string;
  quantite: number;
  prixUnitaire: number;
  userId: string;
}

interface EntretienPieceModel extends Model<EntretienPieceAttributes>, EntretienPieceAttributes { }

export class EntretienPieceSQLRepository implements EntretienPieceRepository {
  async save(entretienPiece: EntretienPiece): Promise<EntretienPiece> {
    const saved = await EntretienPieceSQL.create({
      entretienPieceId: entretienPiece.entretienPieceId.toString(),
      entretienId: entretienPiece.entretienId.toString(),
      pieceId: entretienPiece.pieceId.toString(),
      quantite: entretienPiece.quantite,
      prixUnitaire: entretienPiece.prixUnitaire,
      userId: entretienPiece.userId.toString()
    });

    return this.toDomain(saved as EntretienPieceModel);
  }

  async findByEntretienId(entretienId: UUID): Promise<EntretienPiece[]> {
    const pieces = await EntretienPieceSQL.findAll({
      where: { entretienId: entretienId.toString() }
    });

    return pieces.map(piece => this.toDomain(piece as EntretienPieceModel));
  }

  async delete(entretienPieceId: UUID): Promise<boolean> {
    const deleted = await EntretienPieceSQL.destroy({
      where: { entretienPieceId: entretienPieceId.toString() }
    });
    return deleted > 0;
  }

  private toDomain(model: EntretienPieceModel): EntretienPiece {
    return EntretienPiece.create(
      new UUID(model.entretienPieceId),
      new UUID(model.entretienId),
      new UUID(model.pieceId),
      model.quantite,
      model.prixUnitaire,
      new UUID(model.userId)
    );
  }
}