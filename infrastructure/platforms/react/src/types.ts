export interface Client {
  id?: string;
  nom: string;
  prenom: string;
  mail: string;
  telephone: string;
}

export interface Entretien {
  id?: string;
  motoId: string;
  type: string;
  description: string;
  date: string;
  status: string;
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
  id?: string;
  marque: string;
  model: string;
  serialNumber: string;
  kilometrage: number;
  dateMiseEnService: string;
  status: string;
}

export interface Panne {
  id?: string;
  motoId: string;
  description: string;
  date: string;
  actionCorrective: string;
  status: string;
}

export interface Piece {
  id: string;
  nom: string;
  reference: string;
  quantiteEnStock: number;
  seuilCritique: number;
  categorie: string;
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