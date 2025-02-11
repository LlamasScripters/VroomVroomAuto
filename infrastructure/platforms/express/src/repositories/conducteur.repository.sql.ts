// infrastructure/platforms/express/repositories/conducteur.repository.sql.ts
import { Conducteur, DisponibiliteConducteur, StatutConducteur } from '@domain/entities/ConducteurEntity';
import { ConducteurRepository } from '@application/repositories/ConducteurRepository';
import { UUID } from '@domain/value-objects/UUID';
import ConducteurSQL from '../modelsSQL/conducteur.sql';
import { Model } from 'sequelize';

interface ConducteurModel extends Model {
    conducteurId: string;
    nom: string;
    prenom: string;
    dateNaissance: Date;
    numeroPermis: string;
    categoriePermis: string;
    dateObtentionPermis: Date;
    dateValiditePermis: Date;
    anneeExperience: number;
    telephone: string;
    email: string;
    disponibilite: DisponibiliteConducteur;
    statut: StatutConducteur;
    userId: string;
    dateCreation: Date;
    derniereModification: Date;
}

export class ConducteurSQLRepository implements ConducteurRepository {
    async save(conducteur: Conducteur): Promise<Conducteur> {
        try {
            const saved = await ConducteurSQL.create({
                conducteurId: conducteur.conducteurId.toString(),
                nom: conducteur.nom,
                prenom: conducteur.prenom,
                dateNaissance: conducteur.dateNaissance,
                numeroPermis: conducteur.numeroPermis,
                categoriePermis: conducteur.categoriePermis,
                dateObtentionPermis: conducteur.dateObtentionPermis,
                dateValiditePermis: conducteur.dateValiditePermis,
                anneeExperience: conducteur.anneeExperience,
                telephone: conducteur.telephone,
                email: conducteur.email,
                disponibilite: conducteur.disponibilite,
                statut: conducteur.statut,
                userId: conducteur.userId.toString(),
                dateCreation: conducteur.dateCreation,
                derniereModification: conducteur.derniereModification
            });

            return this.toDomain(saved as ConducteurModel);
        } catch (error) {
            throw new Error(`Erreur lors de la sauvegarde du conducteur: ${error}`);
        }
    }

    async findById(conducteurId: UUID): Promise<Conducteur | null> {
        const conducteur = await ConducteurSQL.findByPk(conducteurId.toString()) as ConducteurModel | null;
        if (!conducteur) return null;
        return this.toDomain(conducteur);
    }

    async findAll(): Promise<Conducteur[]> {
        const conducteurs = await ConducteurSQL.findAll() as ConducteurModel[];
        return conducteurs.map(conducteur => this.toDomain(conducteur));
    }

    async update(conducteur: Conducteur): Promise<Conducteur> {
        const [numberOfAffectedRows] = await ConducteurSQL.update(
            {
                nom: conducteur.nom,
                prenom: conducteur.prenom,
                dateNaissance: conducteur.dateNaissance,
                numeroPermis: conducteur.numeroPermis,
                categoriePermis: conducteur.categoriePermis,
                dateObtentionPermis: conducteur.dateObtentionPermis,
                dateValiditePermis: conducteur.dateValiditePermis,
                anneeExperience: conducteur.anneeExperience,
                telephone: conducteur.telephone,
                email: conducteur.email,
                disponibilite: conducteur.disponibilite,
                statut: conducteur.statut,
                derniereModification: new Date()
            },
            {
                where: { conducteurId: conducteur.conducteurId.toString() }
            }
        );

        if (numberOfAffectedRows === 0) {
            throw new Error('Conducteur non trouvé');
        }

        const updatedConducteur = await ConducteurSQL.findByPk(conducteur.conducteurId.toString()) as ConducteurModel;
        return this.toDomain(updatedConducteur);
    }

    async delete(conducteurId: UUID): Promise<boolean> {
        const deleted = await ConducteurSQL.destroy({
            where: { conducteurId: conducteurId.toString() }
        });
        return deleted > 0;
    }

    async findByGestionnaire(gestionnaireid: UUID): Promise<Conducteur[]> {
        const conducteurs = await ConducteurSQL.findAll({
            where: { gestionnaireid: gestionnaireid.toString() }
        }) as ConducteurModel[];
        return conducteurs.map(conducteur => this.toDomain(conducteur));
    }

    async findByDisponibilite(disponibilite: DisponibiliteConducteur): Promise<Conducteur[]> {
        const conducteurs = await ConducteurSQL.findAll({
            where: { disponibilite }
        }) as ConducteurModel[];
        return conducteurs.map(conducteur => this.toDomain(conducteur));
    }

    async findByStatut(statut: StatutConducteur): Promise<Conducteur[]> {
        const conducteurs = await ConducteurSQL.findAll({
            where: { statut }
        }) as ConducteurModel[];
        return conducteurs.map(conducteur => this.toDomain(conducteur));
    }

    async findByUser(userId: UUID): Promise<Conducteur | null> {
        const conducteur = await ConducteurSQL.findOne({
            where: { userId: userId.toString() }
        }) as ConducteurModel | null;

        if (!conducteur) return null;
        return this.toDomain(conducteur);
    }

    private toDomain(model: ConducteurModel): Conducteur {
        return Conducteur.create(
            new UUID(model.conducteurId),
            model.nom,
            model.prenom,
            model.dateNaissance,
            model.numeroPermis,
            model.categoriePermis,
            model.dateObtentionPermis,
            model.dateValiditePermis,
            model.anneeExperience,
            model.telephone,
            model.email,
            model.disponibilite,
            model.statut,
            new UUID(model.userId),
            model.dateCreation,
            model.derniereModification
        );
    }
}