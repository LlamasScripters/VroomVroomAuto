export interface CreatePanneDTO {
    panneId: string;
    motoId: string;
    description: string;
    date: Date;
    actionCorrective: string;
    status: string;
    userId: string;
};

export interface UpdatePanneDTO {
    panneId: string;
    motoId?: string;
    description?: string;
    date?: string;
    actionCorrective?: string;
    status?: string;
    userId?: string;
};

export interface DeletePanneDTO {
    panneId: string;
};

export interface GetPanneDTO {
    panneId: string;
};

export interface PanneDTO {
    panneId: string;
    motoId: string;
    description: string;
    date: string;
    actionCorrective: string;
    status: string;
    userId: string;
};