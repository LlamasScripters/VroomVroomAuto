// infrastructure/platforms/react/src/components/entretienManagement/EntretienDetailsView.tsx
import React from 'react';
import { Entretien } from '../../types';
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { X } from 'lucide-react';

interface EntretienDetailsViewProps {
  entretien: Entretien;
  onClose: () => void;
}

const EntretienDetailsView: React.FC<EntretienDetailsViewProps> = ({
  entretien,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Détails de l'entretien</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Informations sur la moto */}
          <section className="space-y-2">
            <h3 className="text-lg font-semibold">Informations sur la moto</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Marque et Modèle</p>
                <p>{entretien.motoDetails?.marque} {entretien.motoDetails?.model}</p>
              </div>
              <div>
                <p className="text-gray-600">Numéro de série</p>
                <p>{entretien.motoDetails?.serialNumber}</p>
              </div>
            </div>
          </section>

          {/* Détails de l'intervention */}
          <section className="space-y-2">
            <h3 className="text-lg font-semibold">Détails de l'intervention</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Type d'entretien</p>
                <p>{entretien.typeEntretien}</p>
              </div>
              <div>
                <p className="text-gray-600">Statut</p>
                <p>{entretien.statut}</p>
              </div>
              <div>
                <p className="text-gray-600">Date prévue</p>
                <p>{new Date(entretien.datePrevue).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Date réalisée</p>
                <p>{entretien.dateRealisee ? new Date(entretien.dateRealisee).toLocaleDateString() : '-'}</p>
              </div>
              <div>
                <p className="text-gray-600">Kilométrage</p>
                <p>{entretien.kilometrageEntretien} km</p>
              </div>
            </div>
          </section>

          {/* Coûts */}
          <section className="space-y-2">
            <h3 className="text-lg font-semibold">Détails des coûts</h3>
            <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-md">
              <div>
                <p className="text-gray-600">Coût main d'œuvre</p>
                <p className="text-lg font-medium">{entretien.coutMainOeuvre}€</p>
              </div>
              <div>
                <p className="text-gray-600">Coût des pièces</p>
                <p className="text-lg font-medium">{entretien.coutPieces}€</p>
              </div>
              <div>
                <p className="text-gray-600">Coût total</p>
                <p className="text-lg font-medium text-blue-600">
                {`${(parseFloat(entretien.coutMainOeuvre?.toString() || '0') + parseFloat(entretien.coutPieces?.toString() || '0')).toFixed(2).replace('.', ',')}€`}
                </p>
              </div>
            </div>
          </section>

          {/* Pièces utilisées */}
          {entretien.pieces && entretien.pieces.length > 0 && (
            <section className="space-y-2">
              <h3 className="text-lg font-semibold">Pièces utilisées</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Référence</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Quantité</TableHead>
                    <TableHead>Prix unitaire</TableHead>
                    <TableHead className="text-right">Sous-total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entretien.pieces.map((piece) => (
                    <TableRow key={piece.pieceId}>
                      <TableCell className="font-medium">{piece.reference}</TableCell>
                      <TableCell>{piece.nom}</TableCell>
                      <TableCell>{piece.quantite}</TableCell>
                      <TableCell>{piece.prixUnitaire}€</TableCell>
                      <TableCell className="text-right">{piece.quantite * piece.prixUnitaire}€</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </section>
          )}

          {/* Recommandations */}
          <section className="space-y-2">
            <h3 className="text-lg font-semibold">Recommandations</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Recommandations du technicien</p>
                <p className="bg-gray-50 p-3 rounded-md">{entretien.recommandationsTechnicien || "Aucune recommandation"}</p>
              </div>
              <div>
                <p className="text-gray-600">Recommandations du gestionnaire</p>
                <p className="bg-gray-50 p-3 rounded-md">{entretien.recommandationsGestionnaireClient || "Aucune recommandation"}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EntretienDetailsView;