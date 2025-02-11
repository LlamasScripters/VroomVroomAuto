// infrastructure/platforms/react/src/pages/HistoriqueCommandesPage.tsx
import { useEffect, useState } from 'react';
import { Commande } from '../types';
import { CommandeService } from '../services/commandeService';
import { useAuthStore } from '../stores/authStore';
import SearchAndFilters from '../components/shared/SearchAndFilters';
import { CommandeTable } from '../components/commandeManagement/CommandeTable';
import { CommandeDetailsView } from '../components/commandeManagement/CommandeDetailsView';
import { toast } from "react-hot-toast";

export default function HistoriqueCommandesPage() {
    const [commandes, setCommandes] = useState<Commande[]>([]);
    const [filteredCommandes, setFilteredCommandes] = useState<Commande[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedCommande, setSelectedCommande] = useState<Commande | null>(null);
    const { user } = useAuthStore();

    useEffect(() => {
        fetchHistoriqueCommandes();
    }, []);

    const fetchHistoriqueCommandes = async () => {
        try {
            setIsLoading(true);
            setError(null);
            let data = await CommandeService.getAllCommandes();
            
            // filtrage pour n'avoir que les commandes terminées (livrées ou annulées) du gestionnaire connecté
            data = data.filter(commande => 
                commande.gestionnaireid === user?.id && 
                (commande.statut === 'LIVREE' || commande.statut === 'ANNULEE')
            );
            
            // triage des commandes par date, les plus récentes en premier
            data.sort((a, b) => new Date(b.dateCommande).getTime() - new Date(a.dateCommande).getTime());
            
            setCommandes(data);
            setFilteredCommandes(data);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
            setError(errorMessage);
            toast.error('Erreur lors de la récupération de l\'historique des commandes');
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewCommande = (commande: Commande) => {
        setSelectedCommande(commande);
    };

    const handleSearch = (query: string) => {
        const filtered = commandes.filter((commande) =>
            commande.pieceDetails?.reference.toLowerCase().includes(query.toLowerCase()) ||
            commande.pieceDetails?.nom.toLowerCase().includes(query.toLowerCase()) ||
            commande.statut.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCommandes(filtered);
    };

    const handleFilter = (statut: string) => {
        if (statut === '') {
            setFilteredCommandes(commandes);
        } else {
            const filtered = commandes.filter((commande) => commande.statut === statut);
            setFilteredCommandes(filtered);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Historique des Commandes</h1>
                <div className="text-sm text-gray-600">
                    Total des commandes : {commandes.length}
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
                    { value: 'LIVREE', label: 'Livrée' },
                    { value: 'ANNULEE', label: 'Annulée' },
                ]}
                placeholder="Rechercher une commande par référence ou nom..."
            />

            {isLoading ? (
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <CommandeTable
                    commandes={filteredCommandes}
                    onViewCommande={handleViewCommande}
                    onEditCommande={() => {}}
                    onDeleteCommande={() => {}}
                    readOnly={true}
                    onRefresh={fetchHistoriqueCommandes}
                />
            )}

            {selectedCommande && (
                <CommandeDetailsView
                    commande={selectedCommande}
                    onClose={() => setSelectedCommande(null)}
                />
            )}
        </div>
    );
}