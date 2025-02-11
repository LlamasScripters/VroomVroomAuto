// infrastructure/platforms/react/src/components/commandeManagement/CommandeStatusUpdate.tsx

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CommandeService } from '../../services/commandeService';
import { toast } from 'react-hot-toast';

const STATUTS_COMMANDE = [
  { value: 'EN_ATTENTE', label: 'En attente' },
  { value: 'EN_COURS', label: 'En cours de traitement' },
  { value: 'LIVREE', label: 'Livrée' },
  { value: 'ANNULEE', label: 'Annulée' }
];

interface CommandeStatusUpdateProps {
  commandeId: string;
  statutActuel: string;
  onStatusUpdate: () => void;
}

export function CommandeStatusUpdate({ commandeId, statutActuel, onStatusUpdate }: CommandeStatusUpdateProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async (nouveauStatut: string) => {
    try {
      setIsUpdating(true);
      await CommandeService.updateStatut(commandeId, nouveauStatut);
      toast.success('Statut de la commande mis à jour');
      onStatusUpdate();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      toast.error("Erreur lors de la mise à jour du statut de la commande");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      {STATUTS_COMMANDE.map(statut => (
        statut.value !== statutActuel && (
          <Button
            key={statut.value}
            variant="outline"
            size="sm"
            disabled={isUpdating}
            onClick={() => handleStatusUpdate(statut.value)}
          >
            Passer à "{statut.label}"
          </Button>
        )
      ))}
    </div>
  );
}