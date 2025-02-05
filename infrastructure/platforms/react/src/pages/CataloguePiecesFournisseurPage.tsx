// infrastructure/platforms/react/src/pages/CataloguePiecesFournisseurPage.tsx
import { useEffect, useState } from 'react';
import { PieceFournisseur } from '../types';
import { PieceFournisseurService } from '../services/pieceFournisseurService';
import SearchAndFilters from '../components/shared/SearchAndFilters';
import { CataloguePiecesFournisseurTable } from '../components/cataloguePieces/CataloguePiecesFournisseurTable';
import { PanierCommande } from '../components/commandeManagement/PanierCommande';
import { toast } from "react-hot-toast";

export default function CataloguePiecesFournisseurPage() {
    const [pieces, setPieces] = useState<PieceFournisseur[]>([]);
    const [filteredPieces, setFilteredPieces] = useState<PieceFournisseur[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPieces();
    }, []);

    const fetchPieces = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            const data = await PieceFournisseurService.getAllPieces();
            const availablePieces = data.filter(piece => piece.disponible);

            setPieces(availablePieces);
            setFilteredPieces(availablePieces);
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
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Catalogue des Pièces Triumph Motorcycles</h1>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-4 mb-6">
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
                        { value: 'Autres', label: 'Autres' }
                    ]}
                    placeholder="Rechercher une pièce..."
                />
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <>
                    <CataloguePiecesFournisseurTable
                        pieces={filteredPieces}
                        showAddToCart={true}
                    />
                    <PanierCommande />
                </>
            )}
        </div>
    );
}