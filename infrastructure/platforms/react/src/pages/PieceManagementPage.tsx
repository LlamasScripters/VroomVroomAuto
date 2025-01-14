import { useState } from 'react';
import { Piece } from '../types';
import PieceForm from '../components/pieceManagement/PieceForm';
import PieceTable from '../components/pieceManagement/PieceTable';
import SearchAndFilters from '../components/shared/SearchAndFilters';

const mockPieces: Piece[] = [
  { id: '1', nom: 'Filtre à huile', reference: 'A123', quantiteEnStock: 5, seuilCritique: 10, categorie: 'Filtration' },
  { id: '2', nom: 'Disque de frein', reference: 'B456', quantiteEnStock: 20, seuilCritique: 15, categorie: 'Freinage' },
  { id: '3', nom: 'Pneu arrière', reference: 'C789', quantiteEnStock: 2, seuilCritique: 5, categorie: 'Pneumatique' },
  { id: '4', nom: 'Bougie', reference: 'D012', quantiteEnStock: 10, seuilCritique: 8, categorie: 'Allumage' },
  { id: '5', nom: 'Plaquettes de frein', reference: 'E345', quantiteEnStock: 12, seuilCritique: 10, categorie: 'Freinage' },
  { id: '6', nom: 'Pneu avant', reference: 'F678', quantiteEnStock: 3, seuilCritique: 5, categorie: 'Pneumatique' },
  { id: '7', nom: 'Filtre à air', reference: 'G901', quantiteEnStock: 8, seuilCritique: 10, categorie: 'Filtration' },
  { id: '8', nom: 'Ampoule', reference: 'H234', quantiteEnStock: 6, seuilCritique: 10, categorie: 'Eclairage' },
];

function PieceManagementPage() {
  const [pieces, setPieces] = useState<Piece[]>(mockPieces);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);

  const handleAddPiece = () => {
    setCurrentPiece(null);
    setIsFormVisible(true);
  };

  const handleEditPiece = (piece: Piece) => {
    setCurrentPiece(piece);
    setIsFormVisible(true);
  };

  const handleDeletePiece = (id: string) => {
    setPieces(pieces.filter((piece) => piece.id !== id));
    alert("Pièce supprimée avec succès !");
  };

  const handleSubmitPiece = (piece: Piece) => {
    if (piece.id) {
      setPieces(pieces.map((p) => (p.id === piece.id ? piece : p)));
      alert("Pièce modifiée avec succès !");
    } else {
      setPieces([...pieces, { ...piece, id: `${Date.now()}` }]);
      alert("Pièce ajoutée avec succès !");
    }
    setIsFormVisible(false);
  };

  const handleCancelForm = () => {
    setIsFormVisible(false);
  };

  const handleSearch = (query: string) => {
    setPieces(mockPieces.filter((piece) => piece.nom.toLowerCase().includes(query.toLowerCase())));
  };

  const handleFilter = (filter: string) => {
    if (filter === 'SeuilCritique') {
      setPieces(mockPieces.filter((piece) => piece.quantiteEnStock < piece.seuilCritique));
    } else {
      setPieces(mockPieces);
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Gestion des Pièces</h1>
      <SearchAndFilters
        onSearch={handleSearch}
        onFilter={handleFilter}
        filterOptions={[
          { value: 'SeuilCritique', label: 'Sous seuil critique' },
        ]}
        placeholder="Rechercher une pièce..."
      />
      <button
        onClick={handleAddPiece}
        className="bg-blue-500 text-white py-2 px-4 rounded my-4"
      >
        Ajouter une pièce
      </button>
      <PieceTable
        pieces={pieces}
        onEditPiece={handleEditPiece}
        onDeletePiece={handleDeletePiece}
      />

      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <PieceForm
            onSubmit={handleSubmitPiece}
            onCancel={handleCancelForm}
            initialData={currentPiece || undefined}
          />
        </div>
      )}
    </div>
  );
}

export default PieceManagementPage;
