export interface User {
  userId: string;
  username: string;
  email: string;
}
export interface Client {
  id?: string;
  nom: string;
  prenom: string;
  mail: string;
  telephone: string;
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
  cout: number;
  statut: string;
  userId: string;
  motoDetails?: {
    marque: string;
    model: string;
    serialNumber: string;
    userId: string;
  };
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

export interface Garantie {
  id?: string;
  motoId: string;
  description: string;
  dateDebut: string;
  dateFin: string;
  status: string;
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

export interface Reparation {
  id?: string;
  panneId: string;
  description: string;
  date: string;
  actionsCorrectives: string[];
}

export interface MaintenanceRule {
  id?: string;
  modele: string;
  intervalleKilometrage: number;
  intervalleTemps: number;
  typeEntretien: string;
}