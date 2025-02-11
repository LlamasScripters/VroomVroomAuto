// application/dtos/PieceFournisseurDTO.ts
export interface CreatePieceFournisseurDTO {
    reference: string;
    nom: string;
    description: string;
    categorie: string;
    prixUnitaire: number;
    quantiteEnStock: number;
    seuilCritique: number;
}

export interface UpdatePieceFournisseurDTO {
    pieceId: string;
    reference?: string;
    nom?: string;
    description?: string;
    categorie?: string;
    prixUnitaire?: number;
    quantiteEnStock?: number;
    seuilCritique?: number;
}

export interface PieceFournisseurDTO {
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