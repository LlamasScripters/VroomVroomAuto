// domain/entities/ConducteurEntity.ts
import { UUID } from '../value-objects/UUID';

export enum DisponibiliteConducteur {
  SEMAINE = 'SEMAINE',           
  WEEKEND = 'WEEKEND',       
  TEMPS_PLEIN = 'TEMPS_PLEIN' 
}

export enum StatutConducteur {
    ACTIF = 'ACTIF',
    INACTIF = 'INACTIF',
    SUSPENDU = 'SUSPENDU'
}

export class Conducteur {
    constructor(
        public readonly conducteurId: UUID,
        public readonly nom: string,
        public readonly prenom: string,
        public readonly dateNaissance: Date,
        public readonly numeroPermis: string,
        public readonly categoriePermis: string,
        public readonly dateObtentionPermis: Date,
        public readonly dateValiditePermis: Date,
        public readonly anneeExperience: number,
        public readonly telephone: string,
        public readonly email: string,
        public readonly disponibilite: DisponibiliteConducteur,
        public readonly statut: StatutConducteur,
        public readonly gestionnaireid: UUID,
        public readonly dateCreation: Date,
        public readonly derniereModification: Date
    ) {
        this.validateConducteur();
    }

    private validateConducteur(): void {
        if (this.anneeExperience < 0) {
            throw new Error('Les années d\'expérience ne peuvent pas être négatives');
        }
        if (this.dateValiditePermis < new Date()) {
            throw new Error('Le permis n\'est plus valide');
        }
        if (this.dateNaissance > new Date()) {
            throw new Error('La date de naissance n\'est pas valide');
        }
    }

    public isPermisValide(): boolean {
        return this.dateValiditePermis > new Date();
    }

    public static create(
        conducteurId: UUID,
        nom: string,
        prenom: string,
        dateNaissance: Date,
        numeroPermis: string,
        categoriePermis: string,
        dateObtentionPermis: Date,
        dateValiditePermis: Date,
        anneeExperience: number,
        telephone: string,
        email: string,
        categoriePermanence: DisponibiliteConducteur,
        statut: StatutConducteur,
        gestionnaireid: UUID,
        dateCreation: Date = new Date(),
        derniereModification: Date = new Date()
    ): Conducteur {
        return new Conducteur(
            conducteurId,
            nom,
            prenom,
            dateNaissance,
            numeroPermis,
            categoriePermis,
            dateObtentionPermis,
            dateValiditePermis,
            anneeExperience,
            telephone,
            email,
            categoriePermanence,
            statut,
            gestionnaireid,
            dateCreation,
            derniereModification
        );
    }
}