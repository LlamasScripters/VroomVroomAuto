// infrastructure/platforms/react/src/components/pieceManagement/PieceDetailsView.tsx
import { Piece } from '../../types';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

interface PieceDetailsViewProps {
  piece: Piece;
  onClose: () => void;
}

export function PieceDetailsView({ piece, onClose }: PieceDetailsViewProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Détails de la pièce</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Informations générales */}
          <section className="space-y-2">
            <h3 className="text-lg font-semibold">Informations générales</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Référence</p>
                <p className="font-medium">{piece.reference}</p>
              </div>
              <div>
                <p className="text-gray-600">Nom</p>
                <p className="font-medium">{piece.nom}</p>
              </div>
              <div>
                <p className="text-gray-600">Catégorie</p>
                <p className="font-medium">{piece.categorie}</p>
              </div>
              <div>
                <p className="text-gray-600">Fournisseur</p>
                <p className="font-medium">{piece.fournisseur || 'Non spécifié'}</p>
              </div>
            </div>
          </section>

          {/* Informations de stock */}
          <section className="space-y-2">
            <h3 className="text-lg font-semibold">État du stock</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Quantité en stock</p>
                <p className="font-medium">{piece.quantiteEnStock} unités</p>
              </div>
              <div>
                <p className="text-gray-600">Seuil critique</p>
                <p className="font-medium">{piece.seuilCritique} unités</p>
              </div>
              <div>
                <p className="text-gray-600">État du stock</p>
                <p className={`font-medium ${piece.stockCritique ? 'text-red-600' : 'text-green-600'}`}>
                  {piece.stockCritique ? 'Stock critique' : 'Stock normal'}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Prix unitaire</p>
                <p className="font-medium">{piece.prixUnitaire ? `${piece.prixUnitaire}€` : 'Non spécifié'}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}