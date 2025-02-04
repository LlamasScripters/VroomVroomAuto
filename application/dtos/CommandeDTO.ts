// application/dtos/CommandeDTO.ts
export interface CreateCommandeDTO {
    pieceId: string;
    quantiteCommandee: number;
    dateLivraisonPrevue: string;
    userId: string;
  }
  
  export interface UpdateCommandeDTO {
    commandeId: string;
    pieceId?: string;
    quantiteCommandee?: number;
    dateLivraisonPrevue?: string;
    statut?: string;
  }
  
  export interface CommandeDTO {
    commandeId: string;
    pieceId: string;
    pieceDetails?: {
      nom: string;
      reference: string;
      prixUnitaire: number;
    };
    quantiteCommandee: number;
    coutTotal: number;
    dateCommande: string;
    dateLivraisonPrevue: string;
    statut: string;
    userId: string;
  }