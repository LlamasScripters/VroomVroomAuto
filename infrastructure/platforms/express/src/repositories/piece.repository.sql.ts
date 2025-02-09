// infrastructure/repositories/piece.repository.sql.ts
import { PieceRepository } from '@application/repositories/PieceRepository';
import { Piece } from '@domain/entities/PieceEntity';
import { UUID } from '@domain/value-objects/UUID';
import PieceSQLModel from '../modelsSQL/piece.sql';
import { Model, Op } from 'sequelize';

interface PieceAttributes {
  pieceId: string;
  nom: string;
  reference: string;
  quantiteEnStock: number;
  seuilCritique: number;
  categorie: string;
  fournisseur?: string;
  prixUnitaire?: number;
}

interface PieceModel extends Model<PieceAttributes>, PieceAttributes {}

export class PieceSQLRepository implements PieceRepository {
  async save(piece: Piece): Promise<Piece> {
    try {
      const saved = await PieceSQLModel.create({
        pieceId: piece.pieceId.toString(),
        nom: piece.nom,
        reference: piece.reference,
        quantiteEnStock: piece.quantiteEnStock,
        seuilCritique: piece.seuilCritique,
        categorie: piece.categorie,
        fournisseur: piece.fournisseur,
        prixUnitaire: piece.prixUnitaire
      });

      return this.toDomain(saved as PieceModel);
    } catch (error) {
      throw new Error(`Erreur lors de la sauvegarde de la pièce: ${error}`);
    }
  }

  async findById(pieceId: UUID): Promise<Piece | null> {
    const piece = await PieceSQLModel.findByPk(pieceId.toString());
    if (!piece) return null;
    return this.toDomain(piece as PieceModel);
  }

  async findAll(): Promise<Piece[]> {
    const pieces = await PieceSQLModel.findAll();
    return pieces.map(piece => this.toDomain(piece as PieceModel));
  }

  async update(piece: Piece): Promise<Piece> {
    const [updatedCount] = await PieceSQLModel.update(
      {
        nom: piece.nom,
        reference: piece.reference,
        quantiteEnStock: piece.quantiteEnStock,
        seuilCritique: piece.seuilCritique,
        categorie: piece.categorie,
        fournisseur: piece.fournisseur,
        prixUnitaire: piece.prixUnitaire
      },
      {
        where: { pieceId: piece.pieceId.toString() }
      }
    );

    if (updatedCount === 0) {
      throw new Error("Pièce non trouvée");
    }

    const updated = await PieceSQLModel.findByPk(piece.pieceId.toString());
    if (!updated) {
      throw new Error("Pièce non trouvée après mise à jour");
    }

    return this.toDomain(updated as PieceModel);
  }

  async delete(pieceId: UUID): Promise<boolean> {
    const deleted = await PieceSQLModel.destroy({
      where: { pieceId: pieceId.toString() }
    });
    return deleted > 0;
  }

  async updateStock(pieceId: UUID, quantite: number, type: 'AJOUT' | 'RETRAIT'): Promise<Piece> {
    const piece = await PieceSQLModel.findByPk(pieceId.toString());
    if (!piece) {
      throw new Error("Pièce non trouvée");
    }

    const stockActuel = (piece as PieceModel).quantiteEnStock;
    
    const nouvelleQuantite = type === 'AJOUT' 
    ? stockActuel + quantite
    : stockActuel - quantite;

    if (nouvelleQuantite < 0) {
      throw new Error("La quantité en stock ne peut pas être négative");
    }

    await PieceSQLModel.update(
      { quantiteEnStock: nouvelleQuantite },
      { where: { pieceId: pieceId.toString() } }
    );

    const pieceUpdated = await PieceSQLModel.findByPk(pieceId.toString());

    if (!pieceUpdated) {
      throw new Error("Pièce non trouvée après mise à jour");
    }

    return this.toDomain(pieceUpdated as PieceModel);
  }

  async findByCriticalStock(): Promise<Piece[]> {
    const results = await PieceSQLModel.findAll({
      where: {
        quantiteEnStock: {
          [Op.lt]: 5
        }
      }
    });
    return results.map(piece => this.toDomain(piece as PieceModel));
  }

  async findByReference(reference: string): Promise<Piece | null> {
    const piece = await PieceSQLModel.findOne({
      where: { reference }
    });
    if (!piece) return null;
    return this.toDomain(piece as PieceModel);
  }
  

  private toDomain(model: PieceModel): Piece {
    return Piece.create(
      new UUID(model.pieceId),
      model.nom,
      model.reference,
      model.quantiteEnStock,
      model.seuilCritique,
      model.categorie,
      model.fournisseur,
      model.prixUnitaire
    );
  }
}