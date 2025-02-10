// infrastructure/repositories/pieceFournisseur.repository.sql.ts
import { PieceFournisseurRepository } from '@application/repositories/PieceFournisseurRepository';
import { PieceFournisseur } from '@domain/entities/PieceFournisseurEntity';
import { UUID } from '@domain/value-objects/UUID';
import { Model, Op, Sequelize } from 'sequelize';
import PieceFournisseurSQL from '../modelsSQL/pieceFournisseur.sql';

interface PieceFournisseurAttributes {
    pieceId: string;
    reference: string;
    nom: string;
    description: string;
    categorie: string;
    prixUnitaire: number;
    quantiteEnStock: number;
    seuilCritique: number;
    fournisseur: string;
}

interface PieceFournisseurModel extends Model<PieceFournisseurAttributes>, PieceFournisseurAttributes { }

export class PieceFournisseurSQLRepository implements PieceFournisseurRepository {
    async save(piece: PieceFournisseur): Promise<PieceFournisseur> {
        try {
            const saved = await PieceFournisseurSQL.create({
                pieceId: piece.pieceId.toString(),
                reference: piece.reference,
                nom: piece.nom,
                description: piece.description,
                categorie: piece.categorie,
                prixUnitaire: piece.prixUnitaire,
                quantiteEnStock: piece.quantiteEnStock,
                seuilCritique: piece.seuilCritique,
                fournisseur: piece.fournisseur
            });

            return this.toDomain(saved as PieceFournisseurModel);
        } catch (error) {
            throw new Error(`Erreur lors de la sauvegarde de la pièce: ${error}`);
        }
    }

    async findById(pieceId: UUID): Promise<PieceFournisseur | null> {
        const piece = await PieceFournisseurSQL.findByPk(pieceId.toString());
        if (!piece) return null;
        return this.toDomain(piece as PieceFournisseurModel);
    }

    async findAll(): Promise<PieceFournisseur[]> {
        const pieces = await PieceFournisseurSQL.findAll();
        return pieces.map(piece => this.toDomain(piece as PieceFournisseurModel));
    }

    async update(piece: PieceFournisseur): Promise<PieceFournisseur> {
        const [updatedCount] = await PieceFournisseurSQL.update(
            {
                reference: piece.reference,
                nom: piece.nom,
                description: piece.description,
                categorie: piece.categorie,
                prixUnitaire: piece.prixUnitaire,
                quantiteEnStock: piece.quantiteEnStock,
                seuilCritique: piece.seuilCritique,
                fournisseur: piece.fournisseur
            },
            {
                where: { pieceId: piece.pieceId.toString() }
            }
        );

        if (updatedCount === 0) {
            throw new Error("Pièce non trouvée");
        }

        const updated = await PieceFournisseurSQL.findByPk(piece.pieceId.toString());
        if (!updated) {
            throw new Error("Pièce non trouvée après mise à jour");
        }

        return this.toDomain(updated as PieceFournisseurModel);
    }

    async delete(pieceId: UUID): Promise<boolean> {
        const deleted = await PieceFournisseurSQL.destroy({
            where: { pieceId: pieceId.toString() }
        });
        return deleted > 0;
    }

    async updateStock(pieceId: UUID, quantite: number, type: 'AJOUT' | 'RETRAIT'): Promise<PieceFournisseur> {
        const piece = await PieceFournisseurSQL.findByPk(pieceId.toString());
        if (!piece) {
            throw new Error("Pièce non trouvée");
        }

        const nouvelleQuantite = type === 'AJOUT'
            ? (piece as PieceFournisseurModel).quantiteEnStock + quantite
            : (piece as PieceFournisseurModel).quantiteEnStock - quantite;

        if (nouvelleQuantite < 0) {
            throw new Error("La quantité en stock ne peut pas être négative");
        }

        (piece as PieceFournisseurModel).quantiteEnStock = nouvelleQuantite;
        await piece.save();

        return this.toDomain(piece as PieceFournisseurModel);
    }

    async findByCategorie(categorie: string): Promise<PieceFournisseur[]> {
        const pieces = await PieceFournisseurSQL.findAll({
            where: { categorie }
        });
        return pieces.map(piece => this.toDomain(piece as PieceFournisseurModel));
    }

    async findByCriticalStock(): Promise<PieceFournisseur[]> {
        const pieces = await PieceFournisseurSQL.findAll({
            where: {
                quantiteEnStock: {
                    [Op.lte]: Sequelize.col('seuilCritique')
                }
            }
        });
        return pieces.map(piece => this.toDomain(piece as PieceFournisseurModel));
    }

    async searchPieces(query: string): Promise<PieceFournisseur[]> {
        const pieces = await PieceFournisseurSQL.findAll({
            where: {
                [Op.or]: [
                    { reference: { [Op.like]: `%${query}%` } },
                    { nom: { [Op.like]: `%${query}%` } },
                    { description: { [Op.like]: `%${query}%` } }
                ]
            }
        });
        return pieces.map(piece => this.toDomain(piece as PieceFournisseurModel));
    }

    private toDomain(model: PieceFournisseurModel): PieceFournisseur {
        return PieceFournisseur.create(
            new UUID(model.pieceId),
            model.reference,
            model.nom,
            model.description,
            model.categorie as any,
            model.prixUnitaire,
            model.quantiteEnStock,
            model.seuilCritique,
            model.fournisseur
        );
    }
}