export interface ClientSQL {
    clientId: string;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    userId: string;
}

export interface CommandeSQL {
    commandeId: string;
    pieceId: string;
    userId: string;
    quantiteCommandee: number;
    coutTotal: number;
    dateCommande: Date;
    dateLivraison: Date;
    statutCommande: string;
}

export interface ConducteurSQL {
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
    disponibilite: string;
    statut: string;
    userId: string;
    dateCreation: Date;
    derniereModification: Date;
}

export interface EntretienSQL {
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

export interface EssaiSQL {
    essaiId: string;
    motoId: string;
    conducteurId: string;
    dateDebut: Date;
    dateFin: Date;
    duree: number;
    statut: string;
    userId: string;
}

export interface GarantieSQL {
    garantieId: string;
    panneId: string;
    motoId: string;
    couverture: string;
    type: string;
    dateDebut: Date;
    dateFin: Date;
    statut: string;
}

export interface IncidentSQL {
    incidentId: string;
    essaiId: string;
    typeIncident: string;
    description: string;
    dateIncident: Date;
    gravite: string;
}

export interface MotoSQL {
    motoId: string;
    marque: string;
    model: string;
    kilometrage: number;
    dateMiseEnService: Date;
    statut: string;
    serialNumber: string;
    userId: string;
}

export interface PanneSQL {
    panneId: string;
    motoId: string;
    description: string;
    date: Date;
    actionCorrective: string;
    status: string;
    userId: string;
}

export interface PieceSQL {
    pieceId: string;
    nom: string;
    reference: string;
    quantiteEnStock: number;
    seuilCritique: number;
    categorie: string;
}

export interface ReparationSQL {
    reparationId: string;
    panneId: string;
    description: string;
    dateReparation: Date;
    actionsCorrectives: string[];
    coutReparation: number;
    status: string;
    userId: string;
}

export interface UserSQL {
    userId: string;
    username: string;
    email: string;
    password: string;
    role: string;
    isValidated: boolean;
    dateCreation: Date;
    derniereConnexion: Date;
}

