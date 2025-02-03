import React, { useState, useEffect } from 'react';
import { Moto, Piece } from '../../types';
import { MotoService } from '../../services/motoService';
import { PieceService } from '../../services/pieceService';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';

interface EntretienFormProps {
  onSubmit: (entretien: { 
    motoId: string; 
    typeEntretien: string; 
    datePrevue: string;
    dateRealisee: string;
    kilometrageEntretien: number;
    recommandationsTechnicien: string;
    recommandationsGestionnaireClient: string;
    coutMainOeuvre: number;
    coutPieces: number;
    coutTotal: number;
    statut: string;
    userId: string;
  }) => void;
  onCancel: () => void;
  initialData?: {
    motoId: string;
    typeEntretien: string;
    datePrevue: string;
    dateRealisee: string;
    kilometrageEntretien: number;
    recommandationsTechnicien: string;
    recommandationsGestionnaireClient: string;
    coutMainOeuvre: number;
    coutPieces: number;
    coutTotal: number;
    statut: string;
    userId: string;
  };
}



function EntretienForm({ onSubmit, onCancel, initialData }: EntretienFormProps) {
  const [motos, setMotos] = useState<Moto[]>([]);

  const [pieces, setPieces] = useState<Piece[]>([]);
  const [piecesPlanifiees, setPiecesPlanifiees] = useState<{
    pieceId: string;
    nom: string;
    reference: string;
    quantite: number;
    prixUnitaire: number;
    stockDisponible: number;
  }[]>([]);
  const [selectedPieceId, setSelectedPieceId] = useState<string>('');
  const [quantiteSelectionnee, setQuantiteSelectionnee] = useState<number>(1);

  const [formData, setFormData] = useState({
    motoId: initialData?.motoId || '',
    typeEntretien: initialData?.typeEntretien || 'Préventif',
    datePrevue: initialData?.datePrevue ? new Date(initialData.datePrevue).toISOString().split('T')[0] : '',
    dateRealisee: initialData?.dateRealisee ? new Date(initialData.dateRealisee).toISOString().split('T')[0] : '',
    kilometrageEntretien: initialData?.kilometrageEntretien || 0,
    recommandationsTechnicien: initialData?.recommandationsTechnicien || '',
    recommandationsGestionnaireClient: initialData?.recommandationsGestionnaireClient || '',
    coutMainOeuvre: initialData?.coutMainOeuvre || 0,
    coutPieces: initialData?.coutPieces || 0,
    coutTotal: initialData?.coutTotal || 0, 
    statut: initialData?.statut || 'En cours',
    userId: initialData?.userId || crypto.randomUUID()
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [motosData, piecesData] = await Promise.all([
          MotoService.getAllMotos(),
          PieceService.getAllPieces()
        ]);
        setMotos(motosData);
        setPieces(piecesData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedValue = e.target.type === 'number' ? parseFloat(value) : value;
    setFormData({ ...formData, [name]: updatedValue });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAddPiece = () => {
    if (!selectedPieceId || quantiteSelectionnee <= 0) {
      toast.error('Veuillez sélectionner une pièce et une quantité valide');
      return;
    }
  
    const piece = pieces.find(p => p.pieceId === selectedPieceId);
    if (!piece) return;
  
    if (quantiteSelectionnee > piece.quantiteEnStock) {
      toast.error('Quantité demandée supérieure au stock disponible');
      return;
    }
  
    const pieceExistante = piecesPlanifiees.find(p => p.pieceId === selectedPieceId);
    if (pieceExistante) {
      const nouvelleQuantite = pieceExistante.quantite + quantiteSelectionnee;
      if (nouvelleQuantite > piece.quantiteEnStock) {
        toast.error('La quantité totale dépasserait le stock disponible');
        return;
      }
  
      setPiecesPlanifiees(prev => prev.map(p => 
        p.pieceId === selectedPieceId 
          ? { ...p, quantite: nouvelleQuantite }
          : p
      ));
    } else {
      setPiecesPlanifiees(prev => [...prev, {
        pieceId: piece.pieceId!,
        nom: piece.nom,
        reference: piece.reference,
        quantite: quantiteSelectionnee,
        prixUnitaire: piece.prixUnitaire || 0,
        stockDisponible: piece.quantiteEnStock
      }]);
    }
  
    setSelectedPieceId('');
    setQuantiteSelectionnee(1);
    
    // Mettre à jour le coût total
    const coutPieces = calculateCoutTotalPieces() + (piece.prixUnitaire || 0) * quantiteSelectionnee;
    setFormData(prev => ({
      ...prev,
      coutPieces,
      coutTotal: prev.coutMainOeuvre + coutPieces
    }));
  };
  
  const handleRemovePiece = (pieceId: string) => {
    const piece = piecesPlanifiees.find(p => p.pieceId === pieceId);
    setPiecesPlanifiees(prev => prev.filter(p => p.pieceId !== pieceId));
    
    if (piece) {
      const coutPieces = calculateCoutTotalPieces() - piece.prixUnitaire * piece.quantite;
      setFormData(prev => ({
        ...prev,
        coutPieces,
        coutTotal: prev.coutMainOeuvre + coutPieces
      }));
    }
  };
  
  const calculateCoutTotalPieces = () => {
    return piecesPlanifiees.reduce((total, piece) => 
      total + (piece.quantite * piece.prixUnitaire), 0
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center overflow-y-auto p-4">
      <div className="my-8">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4">
            {initialData ? 'Modifier un entretien' : 'Ajouter un entretien'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="motoId" className="block text-sm font-medium text-gray-700">
                Moto
              </label>
              <select
                id="motoId"
                name="motoId"
                value={formData.motoId}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">Sélectionnez une moto</option>
                {motos.map((moto) => (
                  <option key={moto.motoId} value={moto.motoId}>
                    {moto.marque} {moto.model} - {moto.serialNumber}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="typeEntretien" className="block text-sm font-medium text-gray-700">
                Type d'entretien
              </label>
              <select
                id="typeEntretien"
                name="typeEntretien"
                value={formData.typeEntretien}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="Préventif">Préventif</option>
                <option value="Curatif">Curatif</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="datePrevue" className="block text-sm font-medium text-gray-700">
                Date prévue
              </label>
              <input
                type="date"
                id="datePrevue"
                name="datePrevue"
                value={formData.datePrevue}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="dateRealisee" className="block text-sm font-medium text-gray-700">
                Date réalisée
              </label>
              <input
                type="date"
                id="dateRealisee"
                name="dateRealisee"
                value={formData.dateRealisee}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="kilometrageEntretien" className="block text-sm font-medium text-gray-700">
                Kilométrage
              </label>
              <input
                type="number"
                id="kilometrageEntretien"
                name="kilometrageEntretien"
                value={formData.kilometrageEntretien}
                onChange={handleChange}
                required
                min="0"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="coutMainOeuvre" className="block text-sm font-medium text-gray-700">
                Coût de la main d'œuvre (€)
              </label>
              <input
                type="number"
                id="coutMainOeuvre"
                name="coutMainOeuvre"
                value={formData.coutMainOeuvre}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mb-4 md:col-span-2">
              <label htmlFor="recommandationsTechnicien" className="block text-sm font-medium text-gray-700">
                Recommandations du technicien
              </label>
              <textarea
                id="recommandationsTechnicien"
                name="recommandationsTechnicien"
                value={formData.recommandationsTechnicien}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mb-4 md:col-span-2">
              <label htmlFor="recommandationsGestionnaireClient" className="block text-sm font-medium text-gray-700">
                Recommandations du gestionnaire
              </label>
              <textarea
                id="recommandationsGestionnaireClient"
                name="recommandationsGestionnaireClient"
                value={formData.recommandationsGestionnaireClient}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="statut" className="block text-sm font-medium text-gray-700">
                Statut
              </label>
              <select
                id="statut"
                name="statut"
                value={formData.statut}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="En cours">En cours</option>
                <option value="Terminé">Terminé</option>
                <option value="Annulé">Annulé</option>
              </select>
            </div>
          </div>

            {/* Section de sélection des pièces */}
            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-medium mb-4">Sélection des pièces</h3>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Pièce
                  </label>
                  <select
                    value={selectedPieceId}
                    onChange={(e) => setSelectedPieceId(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  >
                    <option value="">Sélectionner une pièce</option>
                    {pieces
                      .filter(p => p.quantiteEnStock > 0) // Ne montrer que les pièces en stock
                      .map(piece => (
                        <option key={piece.pieceId} value={piece.pieceId}>
                          {piece.nom} - {piece.reference} (Stock: {piece.quantiteEnStock})
                        </option>
                      ))
                    }
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Quantité
                  </label>
                  <input
                    type="number"
                    value={quantiteSelectionnee}
                    onChange={(e) => setQuantiteSelectionnee(parseInt(e.target.value))}
                    min="1"
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={handleAddPiece}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Ajouter
                  </button>
                </div>
              </div>

              {/* Tableau des pièces sélectionnées */}
              {piecesPlanifiees.length > 0 && (
                <div className="mt-4">
                <h4 className="text-md font-medium mb-2">Pièces sélectionnées</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Référence</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Quantité</TableHead>
                      <TableHead>Prix unitaire</TableHead>
                      <TableHead>Prix total</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {piecesPlanifiees.map((piece) => (
                      <TableRow key={piece.pieceId}>
                        <TableCell>{piece.reference}</TableCell>
                        <TableCell>{piece.nom}</TableCell>
                        <TableCell>{piece.quantite}</TableCell>
                        <TableCell>{piece.prixUnitaire}€</TableCell>
                        <TableCell>{(piece.quantite * piece.prixUnitaire).toFixed(2)}€</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleRemovePiece(piece.pieceId)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Supprimer</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Résumé des coûts */}
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <div className="flex justify-between items-center">
                    <span>Coût des pièces:</span>
                    <span className="font-medium">{calculateCoutTotalPieces().toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span>Coût de main d'œuvre:</span>
                    <span className="font-medium">{formData.coutMainOeuvre.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-lg font-bold">
                    <span>Coût total:</span>
                    <span>{(calculateCoutTotalPieces() + formData.coutMainOeuvre).toFixed(2)}€</span>
                  </div>
                </div>
              </div>
              )}
            </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {initialData ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EntretienForm;