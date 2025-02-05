// infrastructure/platforms/react/src/components/commandeManagement/PanierCommande.tsx

import { useCommandeStore } from '../../stores/commandeStore';
import { Button } from "@/components/ui/button";
import { ShoppingCart, X } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { toast } from "react-hot-toast";
import { CommandeService } from '../../services/commandeService';

export function PanierCommande() {

    const { user } = useAuthStore();
    const { panier, removeFromPanier, updateQuantite, clearPanier } = useCommandeStore();
    const totalPanier = panier.reduce((acc, item) => 
    acc + (item.prixUnitaire || 0) * item.quantite, 0
    );

    const handleValidateCommande = async () => {
      try {
          if (!user) {
              toast.error("Vous devez être connecté pour passer une commande");
              return;
          }
  
          for (const item of panier) {
              const commandeData = {
                  pieceId: item.pieceId,
                  quantiteCommandee: item.quantite,
                  dateLivraisonPrevue: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                  gestionnaireid: user.id
              };
  
              try {
                  await CommandeService.createCommande(commandeData);
              } catch (error) {
                  console.error(`Erreur pour la pièce ${item.pieceId}:`, error);
                  throw error;
              }
          }
  
          clearPanier();
          toast.success('Commandes créées avec succès');
      } catch (error) {
          console.error('Erreur lors de la validation du panier:', error);
          toast.error("Une erreur est survenue lors de la validation des commandes");
      }
  };
        

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white shadow-lg rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <ShoppingCart className="mr-2" />
          Panier ({panier.length})
        </h3>
        <span className="font-semibold">Total: {totalPanier.toFixed(2)}€</span>
      </div>
      
      {panier.map((item) => (
        <div key={item.pieceId} className="flex items-center justify-between py-2 border-b">
          <div>
            <p className="font-medium">{item.nom}</p>
            <p className="text-sm text-gray-600">{item.reference}</p>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="1"
              value={item.quantite}
              onChange={(e) => updateQuantite(item.pieceId, parseInt(e.target.value))}
              className="w-16 px-2 py-1 border rounded"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFromPanier(item.pieceId)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

    {panier.length > 0 && (
        <div className="mt-4">
          <Button
            className="w-full"
            onClick={handleValidateCommande}
          >
            Valider la commande
          </Button>
        </div>
      )}

    </div>
  );
}