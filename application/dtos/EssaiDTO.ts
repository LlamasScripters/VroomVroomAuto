export interface CreateEssaiDTO {
    motoId: string;
    conducteurId: string;
    dateDebut: string;
    dateFin: string;
    duree: number;
    userId: string;
};

export interface UpdateEssaiDTO {
    essaiId: string;
    motoId?: string;
    conducteurId?: string;
    dateDebut?: string;
    dateFin?: string;
    duree?: number;
    userId?: string;
};

export interface DeleteEssaiDTO {
    essaiId: string;
};

export interface GetEssaiDTO {
    essaiId: string;
};

export interface EssaiDTO {
    essaiId: string;
    motoId: string;
    conducteurId: string;
    dateDebut: string;
    dateFin: string;
    duree: number;
    userId: string;
};