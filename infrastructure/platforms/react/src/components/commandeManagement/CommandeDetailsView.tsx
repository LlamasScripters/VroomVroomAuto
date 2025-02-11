// infrastructure/platforms/react/src/components/commandeManagement/CommandeDetailsView.tsx
import { Commande } from '../../types';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

interface CommandeDetailsViewProps {
  commande: Commande;
  onClose: () => void;
}

export function CommandeDetailsView({ commande, onClose }: CommandeDetailsViewProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center overflow-y-auto p-4">
      <div className="my-8 bg-white rounded-lg shadow-xl w-full max-w-4xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Détails de la commande</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <section className="space-y-2">
            <h3 className="text-lg font-semibold">Informations de la pièce</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Référence</p>
                <p className="font-medium">{commande.pieceDetails?.reference}</p>
              </div>
              <div>
                <p className="text-gray-600">Nom</p>
                <p className="font-medium">{commande.pieceDetails?.nom}</p>
              </div>
              <div>
                <p className="text-gray-600">Prix unitaire</p>
                <p className="font-medium">{commande.pieceDetails?.prixUnitaire}€</p>
              </div>
              <div>
                <p className="text-gray-600">Quantité commandée</p>
                <p className="font-medium">{commande.quantiteCommandee}</p>
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-semibold">Détails de la commande</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Date de commande</p>
                <p className="font-medium">{new Date(commande.dateCommande).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Date de livraison prévue</p>
                <p className="font-medium">{new Date(commande.dateLivraisonPrevue).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Coût total</p>
                <p className="font-medium">{commande.coutTotal}€</p>
              </div>
              <div>
                <p className="text-gray-600">Statut</p>
                <span className={`inline-block px-2 py-1 rounded-full text-sm ${
                  commande.statut === 'LIVREE' ? 'bg-green-100 text-green-800' :
                  commande.statut === 'EN_COURS' ? 'bg-blue-100 text-blue-800' :
                  commande.statut === 'EN_ATTENTE' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {commande.statut}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}