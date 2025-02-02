// infrastructure/platforms/react/src/pages/client/ClientEntretiensHistoriquePage.tsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Entretien } from '../types';
import { EntretienService } from '../services/entretienService';
import EntretienDetailsView from '../components/entretienManagement/EntretienDetailsView';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, ArrowLeft } from 'lucide-react';
import { toast } from "react-hot-toast";

function ClientEntretiensHistoriquePage() {
  const navigate = useNavigate();
  const [entretiens, setEntretiens] = useState<Entretien[]>([]);
  const [selectedEntretien, setSelectedEntretien] = useState<Entretien | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const entretiensPerPage = 5;

  useEffect(() => {
    fetchHistoriqueEntretiens();
  }, []);

  const fetchHistoriqueEntretiens = async () => {
    try {
      setIsLoading(true);
      const allEntretiens = await EntretienService.getMyEntretiens();
          
      const historiqueEntretiens = allEntretiens.filter(entretien => 
        entretien.statut === 'Terminé' || entretien.statut === 'Annulé'
      ).sort((a, b) => new Date(b.dateRealisee).getTime() - new Date(a.dateRealisee).getTime());
  
      setEntretiens(historiqueEntretiens);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
      setError(errorMessage);
      toast.error('Erreur lors de la récupération de votre historique d\'entretiens');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStatutBadge = (statut: string) => {
    const statusColors = {
      'Terminé': 'bg-green-100 text-green-800',
      'Annulé': 'bg-red-100 text-red-800',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-sm ${statusColors[statut as keyof typeof statusColors]}`}>
        {statut}
      </span>
    );
  };

  const indexOfLastEntretien = currentPage * entretiensPerPage;
  const indexOfFirstEntretien = indexOfLastEntretien - entretiensPerPage;
  const currentEntretiens = entretiens.slice(indexOfFirstEntretien, indexOfLastEntretien);
  const totalPages = Math.ceil(entretiens.length / entretiensPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          className="mr-4"
          onClick={() => navigate('/entretiens/mes-entretiens')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour aux entretiens en cours
        </Button>
        <h1 className="text-2xl font-bold">Historique de vos entretiens</h1>
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
                <TableHead>Date de réalisation</TableHead>
                <TableHead>Moto</TableHead>
                <TableHead>Type d'entretien</TableHead>
                <TableHead>Kilométrage</TableHead>
                <TableHead>Coût</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Détails</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentEntretiens.map((entretien) => (
                <TableRow key={entretien.entretienId}>
                  <TableCell>{new Date(entretien.dateRealisee).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {entretien.motoDetails?.marque} {entretien.motoDetails?.model}
                  </TableCell>
                  <TableCell>{entretien.typeEntretien}</TableCell>
                  <TableCell>{entretien.kilometrageEntretien} km</TableCell>
                  <TableCell>{entretien.cout} €</TableCell>
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
              {entretiens.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    Aucun historique d'entretien disponible
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="flex justify-center py-4">
              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index + 1}
                  variant={currentPage === index + 1 ? "default" : "outline"}
                  size="sm"
                  className="mx-1"
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          )}
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

export default ClientEntretiensHistoriquePage;