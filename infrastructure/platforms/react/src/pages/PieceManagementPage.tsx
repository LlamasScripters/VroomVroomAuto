// infrastructure/platforms/react/src/pages/PieceManagementPage.tsx
import { useEffect, useState } from 'react';
import { Piece } from '../types';
import { PieceService } from '../services/pieceService';
import { PieceTable } from '../components/pieceManagement/PieceTable';
import { PieceForm } from '../components/pieceManagement/PieceForm';
import { PieceDetailsView } from '../components/pieceManagement/PieceDetailView';
import SearchAndFilters from '../components/shared/SearchAndFilters';
import { toast } from "react-hot-toast";

export default function PieceManagementPage() {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [filteredPieces, setFilteredPieces] = useState<Piece[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const piecesPerPage = 10;

  useEffect(() => {
    fetchPieces();
  }, []);

  const fetchPieces = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await PieceService.getAllPieces();
      setPieces(data);
      setFilteredPieces(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
      setError(errorMessage);
      toast.error('Erreur lors de la récupération des pièces');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPiece = () => {
    setCurrentPiece(null);
    setIsFormVisible(true);
  };

  const handleEditPiece = (piece: Piece) => {
    setCurrentPiece(piece);
    setIsFormVisible(true);
  };

  const handleViewPiece = (piece: Piece) => {
    setSelectedPiece(piece);
  };

  const handleDeletePiece = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette pièce ?')) {
      return;
    }

    try {
      await PieceService.deletePiece(id);
      setPieces(pieces.filter(piece => piece.pieceId !== id));
      setFilteredPieces(filteredPieces.filter(piece => piece.pieceId !== id));
      toast.success('Pièce supprimée avec succès');
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la suppression de la pièce");
    }
  };

  const handleSubmitPiece = async (pieceData: Omit<Piece, 'pieceId' | 'stockCritique'>) => {
    try {
      if (currentPiece?.pieceId) {
        await PieceService.updatePiece({
          ...pieceData,
          pieceId: currentPiece.pieceId,
          stockCritique: pieceData.quantiteEnStock <= pieceData.seuilCritique
        });
        toast.success('Pièce modifiée avec succès');
      } else {
        await PieceService.createPiece(pieceData);
        toast.success('Pièce créée avec succès');
      }
      setIsFormVisible(false);
      fetchPieces();
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'enregistrement de la pièce");
    }
  };

  const handleSearch = (query: string) => {
    const filtered = pieces.filter((piece) =>
      piece.nom.toLowerCase().includes(query.toLowerCase()) ||
      piece.reference.toLowerCase().includes(query.toLowerCase()) ||
      piece.categorie.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPieces(filtered);
    setCurrentPage(1);
  };

  const handleFilter = (categorie: string) => {
    if (categorie === '') {
      setFilteredPieces(pieces);
    } else {
      const filtered = pieces.filter((piece) => piece.categorie === categorie);
      setFilteredPieces(filtered);
    }
    setCurrentPage(1);
  };

  // Pagination
  const indexOfLastPiece = currentPage * piecesPerPage;
  const indexOfFirstPiece = indexOfLastPiece - piecesPerPage;
  const currentPieces = filteredPieces.slice(indexOfFirstPiece, indexOfLastPiece);
  const totalPages = Math.ceil(filteredPieces.length / piecesPerPage);

  return (
    <div className="container mx-auto p-4">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold">Gestion des Pièces Détachées</h1>
        <div className="space-x-4">
          <button
            onClick={handleAddPiece}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Ajouter une pièce
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <SearchAndFilters
        onSearch={handleSearch}
        onFilter={handleFilter}
        filterOptions={[
          { value: 'Filtration', label: 'Filtration' },
          { value: 'Freinage', label: 'Freinage' },
          { value: 'Pneumatiques', label: 'Pneumatiques' },
          { value: 'Moteur', label: 'Moteur' },
          { value: 'Transmission', label: 'Transmission' },
          { value: 'Électrique', label: 'Électrique' },
          { value: 'Carrosserie', label: 'Carrosserie' },
          { value: 'Autres', label: 'Autres' },
        ]}
        placeholder="Rechercher une pièce..."
      />

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <PieceTable
          pieces={currentPieces}
          onEditPiece={handleEditPiece}
          onDeletePiece={handleDeletePiece}
          onViewPiece={handleViewPiece}
        />
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <PieceForm
            onSubmit={handleSubmitPiece}
            onCancel={() => setIsFormVisible(false)}
            initialData={currentPiece || undefined}
          />
        </div>
      )}

      {selectedPiece && (
        <PieceDetailsView
          piece={selectedPiece}
          onClose={() => setSelectedPiece(null)}
        />
      )}
    </div>
  );
}

