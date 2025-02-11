export interface CreateGarantieDTO {
    panneId: string;
    motoId: string;
    couverture: string;
    type: string;
    dateDebut: Date;
    dateFin: Date;
    statut: string;
};

export interface UpdateGarantieDTO {
    garantieId: string;
    panneId?: string;
    motoId?: string;
    couverture?: string;
    type?: string;
    dateDebut?: string;
    dateFin?: string;
    statut?: string;
};

export interface DeleteGarantieDTO {
    garantieId: string;
};

export interface GetGarantieDTO {
    garantieId: string;
};

export interface GarantieDTO {
    garantieId: string;
    panneId: string;
    motoId: string;
    couverture: string;
    type: string;
    dateDebut: string;
    dateFin: string;
    statut: string;
};