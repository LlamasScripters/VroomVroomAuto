// infrastructure/repositories/commande.repository.sql.ts
import { CommandeRepository } from '@application/repositories/CommandeRepository';
import { Commande } from '@domain/entities/CommandeEntity';
import { UUID } from '@domain/value-objects/UUID';
import CommandeSQL from '../modelsSQL/commande.sql';
import PieceFournisseurSQL from '../modelsSQL/pieceFournisseur.sql';
import { Model } from 'sequelize';
import { CommandeStatut } from '@domain/entities/CommandeEntity';

interface CommandeAttributes {
  commandeId: string;
  pieceId: string;
  quantiteCommandee: number;
  coutTotal: number;
  dateCommande: Date;
  dateLivraisonPrevue: Date;
  statut: string;
  userId: string;
  gestionnaireid: string;
  pieceFournisseur?: {
    nom: string;
    reference: string;
    prixUnitaire: number;
    categorie: string;
    fournisseur: string;
  };
}

interface CommandeModel extends Model<CommandeAttributes>, CommandeAttributes { }

export class CommandeSQLRepository implements CommandeRepository {
  async save(commande: Commande): Promise<Commande> {
    try {
      const saved = await CommandeSQL.create({
        commandeId: commande.commandeId.toString(),
        pieceId: commande.pieceId.toString(),
        quantiteCommandee: commande.quantiteCommandee,
        coutTotal: commande.coutTotal,
        dateCommande: commande.dateCommande,
        dateLivraisonPrevue: commande.dateLivraisonPrevue,
        statut: commande.statut,
        gestionnaireid: commande.gestionnaireid.toString()
      });

      const commandeWithPiece = await CommandeSQL.findByPk(saved.get('commandeId') as string, {
        include: [{
          model: PieceFournisseurSQL,
          as: 'pieceFournisseur',
          attributes: ['nom', 'reference', 'prixUnitaire', 'categorie', 'fournisseur']
        }]
      });

      if (!commandeWithPiece) {
        throw new Error('Commande non trouvée après création');
      }

      return this.toDomain(commandeWithPiece as CommandeModel);
    } catch (error) {
      throw new Error(`Erreur lors de la sauvegarde de la commande: ${error}`);
    }
  }


  async findById(commandeId: UUID): Promise<Commande | null> {
    const commande = await CommandeSQL.findByPk(commandeId.toString(), {
      include: [{
        model: PieceFournisseurSQL,
        as: 'pieceFournisseur',
        attributes: ['nom', 'reference', 'prixUnitaire']
      }]
    });

    if (!commande) return null;
    return this.toDomain(commande as CommandeModel);
  }

  async findAll(): Promise<Commande[]> {
    const commandes = await CommandeSQL.findAll({
      include: [{
        model: PieceFournisseurSQL,
        as: 'pieceFournisseur',  // Utilise l'alias correct
        attributes: ['nom', 'reference', 'prixUnitaire', 'categorie', 'fournisseur']
      }],
      order: [['dateCommande', 'DESC']]
    });

    return commandes.map(commande => {
      const commandeData = commande.get({ plain: true });
      return this.toDomain({
        ...commandeData,
        pieceDetails: commandeData.pieceFournisseur ? {
          nom: commandeData.pieceFournisseur.nom,
          reference: commandeData.pieceFournisseur.reference,
          prixUnitaire: Number(commandeData.pieceFournisseur.prixUnitaire),
          categorie: commandeData.pieceFournisseur.categorie,
          fournisseur: commandeData.pieceFournisseur.fournisseur
        } : undefined
      });
    });
  }

  async update(commande: Commande): Promise<Commande> {
    const [updatedCount] = await CommandeSQL.update(
      {
        pieceId: commande.pieceId.toString(),
        quantiteCommandee: commande.quantiteCommandee,
        coutTotal: commande.coutTotal,
        dateCommande: commande.dateCommande,
        dateLivraisonPrevue: commande.dateLivraisonPrevue,
        statut: commande.statut,
        gestionnaireid: commande.gestionnaireid.toString()
      },
      {
        where: { commandeId: commande.commandeId.toString() }
      }
    );

    if (updatedCount === 0) {
      throw new Error("Commande non trouvée");
    }

    const updated = await CommandeSQL.findByPk(commande.commandeId.toString(), {
      include: [{
        model: PieceFournisseurSQL,
        as: 'pieceFournisseur',
        attributes: ['nom', 'reference', 'prixUnitaire']
      }]
    });

    if (!updated) {
      throw new Error("Commande non trouvée après mise à jour");
    }

    return this.toDomain(updated as CommandeModel);
  }

  async delete(commandeId: UUID): Promise<boolean> {
    const deleted = await CommandeSQL.destroy({
      where: { commandeId: commandeId.toString() }
    });
    return deleted > 0;
  }

  async findByPieceId(pieceId: UUID): Promise<Commande[]> {
    const commandes = await CommandeSQL.findAll({
      where: { pieceId: pieceId.toString() },
      include: [{
        model: PieceFournisseurSQL,
        attributes: ['nom', 'reference', 'prixUnitaire']
      }]
    });

    return commandes.map(commande => this.toDomain(commande as CommandeModel));
  }

  async updateStatus(commandeId: UUID, nouveauStatut: string): Promise<Commande> {
    try {
      const existingCommande = await CommandeSQL.findOne({
        where: { commandeId: commandeId.toString() },
        include: [{
          model: PieceFournisseurSQL,
          as: 'pieceFournisseur',
          required: false
        }]
      });

      if (!existingCommande) {
        throw new Error('Commande non trouvée');
      }

      (existingCommande as CommandeModel).statut = nouveauStatut;
      await existingCommande.save();

      const updatedCommande = await CommandeSQL.findOne({
        where: { commandeId: commandeId.toString() },
        include: [{
          model: PieceFournisseurSQL,
          as: 'pieceFournisseur',
          required: false,
          attributes: ['nom', 'reference', 'prixUnitaire']
        }]
      });

      if (!updatedCommande) {
        throw new Error('Commande non trouvée après mise à jour');
      }

      const plainCommande = updatedCommande.get({ plain: true });
      return this.toDomain({
        ...plainCommande,
        piece: plainCommande.piece || undefined
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      throw error;
    }
  }


  private toDomain(model: CommandeModel): Commande {
    return Commande.create(
      new UUID(model.commandeId),
      new UUID(model.pieceId),
      new UUID(model.gestionnaireid),
      model.quantiteCommandee,
      model.coutTotal,
      model.dateCommande,
      model.dateLivraisonPrevue,
      model.statut as CommandeStatut,
      model.pieceFournisseur && {
        nom: model.pieceFournisseur.nom,
        reference: model.pieceFournisseur.reference,
        prixUnitaire: Number(model.pieceFournisseur.prixUnitaire),
        categorie: model.pieceFournisseur.categorie,
        fournisseur: model.pieceFournisseur.fournisseur
      }
    );
  }
}