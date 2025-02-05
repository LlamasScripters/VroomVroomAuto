// infrastructure/platforms/react/src/pages/AdminPieceFournisseurPage.tsx
import { useEffect, useState } from 'react';
import { PieceFournisseur } from '../types';
import { PieceFournisseurService } from '../services/pieceFournisseurService';
import { AdminPieceFournisseurTable } from '../components/adminPieces/AdminPieceFournisseurTable';
import { AdminPieceFournisseurForm } from '../components/adminPieces/AdminPieceFournisseurForm';
import SearchAndFilters from '../components/shared/SearchAndFilters';
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useAuthStore } from '../stores/authStore';


function AdminPieceFournisseurPage() {
    const [pieces, setPieces] = useState<PieceFournisseur[]>([]);
    const [filteredPieces, setFilteredPieces] = useState<PieceFournisseur[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [currentPiece, setCurrentPiece] = useState<PieceFournisseur | null>(null);
    const { user } = useAuthStore();

    useEffect(() => {
        if (user === undefined) return;
      
        if (!user || user.role !== 'admin') {
          toast.error("Accès non autorisé");
          return;
        }
      
        fetchPieces();
      }, [user]);
      


const fetchPieces = async () => {
    try {
        setIsLoading(true);
        setError(null);
        const data = await PieceFournisseurService.getAllPieces();
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

const handleEditPiece = (piece: PieceFournisseur) => {
    setCurrentPiece(piece);
    setIsFormVisible(true);
};

const handleDeletePiece = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette pièce ?')) {
        return;
    }

    try {
        await PieceFournisseurService.deletePieceFournisseur(id);
        setPieces(pieces.filter(piece => piece.pieceId !== id));
        setFilteredPieces(filteredPieces.filter(piece => piece.pieceId !== id));
        toast.success('Pièce supprimée avec succès');
    } catch (error) {
        console.error(error);
        toast.error("Erreur lors de la suppression de la pièce");
    }
};

const handleSubmitPiece = async (pieceData: Omit<PieceFournisseur, "pieceId" | "stockCritique" | "disponible">) => {
    try {
        if (currentPiece?.pieceId) {
            await PieceFournisseurService.updatePieceFournisseur(currentPiece.pieceId, pieceData);
            toast.success('Pièce modifiée avec succès');
        } else {
            await PieceFournisseurService.createPieceFournisseur(pieceData);
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
        piece.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPieces(filtered);
};

const handleFilter = (categorie: string) => {
    if (categorie === '') {
        setFilteredPieces(pieces);
    } else {
        const filtered = pieces.filter((piece) => piece.categorie === categorie);
        setFilteredPieces(filtered);
    }
};

return (
    <div className="container mx-auto p-4">
        <div className="sm:flex sm:items-center sm:justify-between mb-6">
            <h1 className="text-2xl font-bold">Gestion du Catalogue Triumph Motorcycles</h1>
            <div className="mt-4 sm:mt-0">
                <Button onClick={handleAddPiece}>
                    Ajouter une nouvelle pièce
                </Button>
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
                { value: 'Electrique', label: 'Électrique' },
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
            <AdminPieceFournisseurTable
                pieces={filteredPieces}
                onEditPiece={handleEditPiece}
                onDeletePiece={handleDeletePiece}
            />
        )}

        {isFormVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <AdminPieceFournisseurForm
                    onSubmit={handleSubmitPiece}
                    onCancel={() => setIsFormVisible(false)}
                    initialData={currentPiece || undefined}
                />
            </div>
        )}
    </div>
);
}

export default AdminPieceFournisseurPage;