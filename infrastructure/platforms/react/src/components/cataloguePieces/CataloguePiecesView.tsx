// infrastructure/platforms/react/src/components/cataloguePieces/CataloguePiecesView.tsx
import { useEffect, useState } from 'react';
import { PieceFournisseur } from '../../types';
import { PieceFournisseurService } from '../../services/pieceFournisseurService';
import { CataloguePiecesTable } from '../cataloguePieces/CataloguePiecesTable';
import { toast } from 'react-hot-toast';
import SearchAndFilters from '../shared/SearchAndFilters';

export default function CataloguePiecesView() {
    const [pieces, setPieces] = useState<PieceFournisseur[]>([]);
    const [filteredPieces, setFilteredPieces] = useState<PieceFournisseur[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const piecesPerPage = 10;

    useEffect(() => {
        fetchPieces();
    }, []);

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
            toast.error('Erreur lors du chargement du catalogue');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (query: string) => {
        const filtered = pieces.filter((piece) =>
            piece.nom.toLowerCase().includes(query.toLowerCase()) ||
            piece.reference.toLowerCase().includes(query.toLowerCase()) ||
            piece.description.toLowerCase().includes(query.toLowerCase())
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
            <h1 className="text-2xl font-bold mb-6">Catalogue des Pièces Triumph Motorcycles</h1>

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
                <>
                    <CataloguePiecesTable
                        pieces={currentPieces}
                        showAddToCart={true}
                    />

                    <div className="flex justify-center mt-4">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`px-4 py-2 mx-1 rounded ${
                                    currentPage === index + 1 
                                        ? 'bg-blue-500 text-white' 
                                        : 'bg-gray-200'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}