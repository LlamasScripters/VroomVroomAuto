// infrastructure/platforms/react/src/pages/client/ClientEntretiensPage.tsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Entretien } from '../types';
import { EntretienService } from '../services/entretienService';
import EntretienDetailsView from '../components/entretienManagement/EntretienDetailsView';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from 'lucide-react';
import { toast } from "react-hot-toast";

function ClientEntretiensPage() {
  const navigate = useNavigate();
  const [entretiensEnCours, setEntretiensEnCours] = useState<Entretien[]>([]);
  const [selectedEntretien, setSelectedEntretien] = useState<Entretien | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEntretiensClient();
  }, []);

  const fetchEntretiensClient = async () => {
    try {
      setIsLoading(true);
      const allEntretiens = await EntretienService.getMyEntretiens();
          
      const entretiensClient = allEntretiens.filter(entretien => 
        entretien.statut !== 'Terminé' && 
        entretien.statut !== 'Annulé'
      );
  
      setEntretiensEnCours(entretiensClient);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
      setError(errorMessage);
      toast.error('Erreur lors de la récupération de vos entretiens');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStatutBadge = (statut: string) => {
    const statusColors = {
      'Planifié': 'bg-blue-100 text-blue-800',
      'En cours': 'bg-yellow-100 text-yellow-800',
      'En attente': 'bg-purple-100 text-purple-800',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-sm ${statusColors[statut as keyof typeof statusColors]}`}>
        {statut}
      </span>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold">Vos entretiens en cours</h1>
        <Button
          onClick={() => navigate('/entretiens/mes-entretiens/historique')}
          variant="outline"
        >
          Voir l'historique
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Moto</TableHead>
                <TableHead>Type d'entretien</TableHead>
                <TableHead>Date prévue</TableHead>
                <TableHead>Kilométrage prévu</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Détails</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entretiensEnCours.map((entretien) => (
                <TableRow key={entretien.entretienId}>
                  <TableCell>
                    {entretien.motoDetails?.marque} {entretien.motoDetails?.model}
                  </TableCell>
                  <TableCell>{entretien.typeEntretien}</TableCell>
                  <TableCell>{new Date(entretien.datePrevue).toLocaleDateString()}</TableCell>
                  <TableCell>{entretien.kilometrageEntretien} km</TableCell>
                  <TableCell>{renderStatutBadge(entretien.statut)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedEntretien(entretien)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {entretiensEnCours.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Aucun entretien en cours
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {selectedEntretien && (
        <EntretienDetailsView
          entretien={selectedEntretien}
          onClose={() => setSelectedEntretien(null)}
        />
      )}
    </div>
  );
}

export default ClientEntretiensPage;