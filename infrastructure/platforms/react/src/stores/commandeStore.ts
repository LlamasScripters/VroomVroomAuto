// infrastructure/platforms/react/src/stores/commandeStore.ts
import { create } from 'zustand';
import { Piece } from '../types';
import { persist, createJSONStorage } from 'zustand/middleware';
 

interface PanierItem {
  pieceId: string;
  quantite: number;
  nom: string;
  reference: string;
  prixUnitaire?: number;
}

interface CommandeState {
  panier: PanierItem[];
  addToPanier: (piece: Piece, quantite: number) => void;
  removeFromPanier: (pieceId: string) => void;
  updateQuantite: (pieceId: string, quantite: number) => void;
  clearPanier: () => void;
}

export const useCommandeStore = create<CommandeState>()(
  persist(
    (set) => ({
      panier: [],
      addToPanier: (piece, quantite) => set((state) => {
        const existingItem = state.panier.find(item => item.pieceId === piece.pieceId);
        if (existingItem) {
          return {
            panier: state.panier.map(item =>
              item.pieceId === piece.pieceId
                ? { ...item, quantite: item.quantite + quantite }
                : item
            )
          };
        }
        return {
          panier: [...state.panier, {
            pieceId: piece.pieceId!,
            quantite,
            nom: piece.nom,
            reference: piece.reference,
            prixUnitaire: piece.prixUnitaire
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
      clearPanier: () => set({ panier: [] })
    }),
    {
      name: 'panier-storage', // nom unique pour le stockage
      storage: createJSONStorage(() => localStorage)
    }
  )
);