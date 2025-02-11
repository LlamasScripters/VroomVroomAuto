// infrastructure/platforms/react/src/stores/commandeStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { PieceFournisseur } from '../types';

interface PanierItem {
    pieceId: string;
    quantite: number;
    nom: string;
    reference: string;
    prixUnitaire: number;
    categorie: string;
    fournisseur: string;
    description: string;
}

interface CommandeState {
    panier: PanierItem[];
    addToPanier: (piece: PieceFournisseur, quantite: number) => void;
    removeFromPanier: (pieceId: string) => void;
    updateQuantite: (pieceId: string, quantite: number) => void;
    clearPanier: () => void;
    calculateTotal: () => number;
}

export const useCommandeStore = create<CommandeState>()(
    persist(
        (set, get) => ({
            panier: [],
            
            addToPanier: (piece: PieceFournisseur, quantite: number) => set((state) => {
                if (quantite > piece.quantiteEnStock) {
                    throw new Error('Quantité demandée supérieure au stock disponible');
                }

                const existingItem = state.panier.find(item => item.pieceId === piece.pieceId);
                
                if (existingItem) {
                    const nouvelleQuantite = existingItem.quantite + quantite;
                    if (nouvelleQuantite > piece.quantiteEnStock) {
                        throw new Error('Quantité totale demandée supérieure au stock disponible');
                    }
                    
                    return {
                        panier: state.panier.map(item =>
                            item.pieceId === piece.pieceId
                                ? { ...item, quantite: nouvelleQuantite }
                                : item
                        )
                    };
                }
                
                return {
                    panier: [...state.panier, {
                        pieceId: piece.pieceId,
                        quantite,
                        nom: piece.nom,
                        reference: piece.reference,
                        prixUnitaire: piece.prixUnitaire,
                        categorie: piece.categorie,
                        fournisseur: piece.fournisseur,
                        description: piece.description
                    }]
                };
            }),

            removeFromPanier: (pieceId) => set((state) => ({
                panier: state.panier.filter(item => item.pieceId !== pieceId)
            })),

            updateQuantite: (pieceId, quantite) => set((state) => ({
                panier: state.panier.map(item =>
                    item.pieceId === pieceId ? { ...item, quantite } : item
                )
            })),

            clearPanier: () => set({ panier: [] }),

            calculateTotal: () => {
                const state = get();
                return state.panier.reduce((total, item) => 
                    total + (item.prixUnitaire * item.quantite), 0
                );
            }
        }),
        {
            name: 'commande-store',
            storage: createJSONStorage(() => localStorage)
        }
    )
);