// application/dtos/CommandeDTO.ts
export interface CreateCommandeDTO {
    pieceId: string;
    quantiteCommandee: number;
    dateLivraisonPrevue: string;
    gestionnaireid: string;
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