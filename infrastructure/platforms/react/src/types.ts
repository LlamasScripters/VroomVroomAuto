export interface Client {
  id?: string;
  nom: string;
  prenom: string;
  mail: string;
  telephone: string;
}

export interface Employe {
  id?: string;
  nom: string;
  prenom: string;
  mail: string;
  telephone: string;
  dateCreation: Date;
  derniereConnexion: Date;
  role: string;
}

export interface Entretien {
  entretienId?: string;
  motoId: string;
  typeEntretien: string;
  datePrevue: string;
  dateRealisee: string;
  kilometrageEntretien: number;
  recommandationsTechnicien: string;
  recommandationsGestionnaireClient: string;
  statut: string;
  userId: string;
  coutMainOeuvre: number;
  coutPieces: number;
  coutTotal: number;
  pieces?: EntretienPiece[];
  motoDetails?: {
    marque: string;
    model: string;
    serialNumber: string;
    userId: string;
  };
}

export interface EntretienPiece {
  pieceId: string;
  nom: string;
  reference: string;
  quantite: number;
  prixUnitaire: number;
  piece?: {
    reference: string;
    nom: string;
  };
}

export interface Garantie {
  garantieId?: string;
  panneId: string;
  motoId: string;
  couverture: string;
  type: string;
  dateDebut: string;
  dateFin: string;
  statut: string;
}

export interface MaintenancePlanningResultDTO {
  success: boolean;
  entretienId?: string;
  message: string;
  datePrevue: string;
  kilometragePrevu: number;
  modele: string;
  marque: string;
  regleAppliquee: {
    intervalleKilometrage: number;
    intervalleTemps: number;
    typeEntretien: string;
  };
}

export interface MaintenanceRule {
  id?: string;
  modele: string;
  intervalleKilometrage: number;
  intervalleTemps: number;
  typeEntretien: string;
}

export interface Moto {
  motoId?: string;
  marque: string;
  model: string;
  serialNumber: string;
  kilometrage: number;
  dateMiseEnService: string;
  statut: string;
  userId?: string;
  user?: User;
}

export interface Panne {
  panneId?: string;
  motoId: string;
  description: string;
  date: string;
  actionCorrective: string;
  status: 'à traiter' | 'en cours de traitement' | 'traitée';
  userId: string;
}

export interface Piece {
  pieceId?: string;
  nom: string;
  reference: string;
  quantiteEnStock: number;
  seuilCritique: number;
  categorie: string;
  fournisseur?: string;
  prixUnitaire?: number;
  stockCritique: boolean;
}

export interface PiecePlanification {
  pieceId: string;
  quantite: number;
  prixUnitaire: number;
}

export interface Reparation {
  id?: string;
  panneId: string;
  description: string;
  date: string;
  actionsCorrectives: string[];
}

export interface User {
  userId: string;
  username: string;
  email: string;
}

export interface Commande {
  commandeId: string;
  pieceId: string;
  pieceDetails?: {
      nom: string;
      reference: string;
      prixUnitaire: number;
      categorie: string;
      fournisseur: string;
  };
  quantiteCommandee: number;
  coutTotal: number;
  dateCommande: string;
  dateLivraisonPrevue: string;
  statut: string;
  gestionnaireid: string;
}

export interface PieceFournisseur {
  pieceId: string;
  reference: string;
  nom: string;
  description: string;
  categorie: string;
  prixUnitaire: number;
  quantiteEnStock: number;
  seuilCritique: number;
  fournisseur: string;
  stockCritique: boolean;
  disponible: boolean;
}

export interface Conducteur {
  conducteurId?: string;
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
  disponibilite: 'SEMAINE' | 'WEEKEND' | 'TEMPS_PLEIN';
  statut: 'ACTIF' | 'INACTIF' | 'SUSPENDU';
  userId: string;
  dateCreation?: string;
  derniereModification?: string;
  permisValide?: boolean;
}

export interface HistoriqueEssai {
  essaiId: string;
  motoId: string;
  conducteurId: string;
  dateDebut: string;
  dateFin: string;
  duree: number;
  motoDetails?: {
    marque: string;
    model: string;
    serialNumber: string;
  };
  incidents?: Incident[];
}

export interface Incident {
  incidentId: string;
  essaiId: string;
  type: 'ACCIDENT' | 'INFRACTION';
  description: string;
  dateIncident: string;
  gravite: 'MINEUR' | 'MAJEUR' | 'CRITIQUE';
}