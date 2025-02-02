// application/dtos/PieceDTO.ts
export interface CreatePieceDTO {
    nom: string;
    reference: string;
    quantiteEnStock: number;
    seuilCritique: number;
    categorie: string;
    fournisseur?: string;
    prixUnitaire?: number;
  }
  
  export interface UpdatePieceDTO {
    pieceId: string;
    nom?: string;
    reference?: string;
    quantiteEnStock?: number;
    seuilCritique?: number;
    categorie?: string;
    fournisseur?: string;
    prixUnitaire?: number;
  }
  
  export interface PieceDTO {
    pieceId: string;
    nom: string;
    reference: string;
    quantiteEnStock: number;
    seuilCritique: number;
    categorie: string;
    fournisseur?: string;
    prixUnitaire?: number;
    stockCritique: boolean;
  }