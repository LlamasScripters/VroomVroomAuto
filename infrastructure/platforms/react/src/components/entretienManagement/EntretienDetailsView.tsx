// infrastructure/platforms/react/src/components/entretienManagement/EntretienDetailsView.tsx

import React from 'react';
import { Entretien } from '../../types';
import { Button } from "@/components/ui/button"
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

          {/* Détails de l'entretien */}
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
                <p>{new Date(entretien.dateRealisee).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Kilométrage</p>
                <p>{entretien.kilometrageEntretien} km</p>
              </div>
              <div>
                <p className="text-gray-600">Coût total</p>
                <p>{entretien.cout} €</p>
              </div>
            </div>
          </section>

          {/* Recommandations */}
          <section className="space-y-2">
            <h3 className="text-lg font-semibold">Recommandations</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Recommandations du technicien</p>
                <p className="bg-gray-50 p-3 rounded-md">{entretien.recommandationsTechnicien || "Aucune recommandation"}</p>
              </div>
              <div>
                <p className="text-gray-600">Recommandations gestionnaire/client</p>
                <p className="bg-gray-50 p-3 rounded-md">{entretien.recommandationsGestionnaireClient || "Aucune recommandation"}</p>
              </div>
            </div>
          </section>

          {/* Pièces changées - TODO quand la gestion des pièces sera faite */}
          <section className="space-y-2">
            <h3 className="text-lg font-semibold">Pièces changées</h3>
            <p className="text-gray-600">Liste des pièces à venir</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EntretienDetailsView;