// application/dtos/ConducteurDTO.ts
import { DisponibiliteConducteur, StatutConducteur } from '@domain/entities/ConducteurEntity';

export interface CreateConducteurDTO {
    nom: string;
    prenom: string;
    dateNaissance: string;
    numeroPermis: string;
    categoriePermis: string;
    dateObtentionPermis: string;
    dateValiditePermis: string;
    anneeExperience: number;
    telephone: string;
    email: string;
    disponibilite: DisponibiliteConducteur;
    userId: string;
}

export interface UpdateConducteurDTO {
    conducteurId: string;
    nom?: string;
    prenom?: string;
    dateNaissance?: string;
    numeroPermis?: string;
    categoriePermis?: string;
    dateObtentionPermis?: string;
    dateValiditePermis?: string;
    anneeExperience?: number;
    telephone?: string;
    email?: string;
    disponibilite?: DisponibiliteConducteur;
    statut?: StatutConducteur;
}

export interface ConducteurDTO {
    conducteurId: string;
    nom: string;
    prenom: string;
    dateNaissance: string;
    numeroPermis: string;
    categoriePermis: string;
    dateObtentionPermis: string;
    dateValiditePermis: string;
    anneeExperience: number;
    telephone: string;
    email: string;
    disponibilite: DisponibiliteConducteur;
    statut: StatutConducteur;
    userId: string;
    dateCreation: string;
    derniereModification: string;
    permisValide: boolean;
}