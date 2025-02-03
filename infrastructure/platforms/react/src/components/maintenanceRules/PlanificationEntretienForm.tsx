// infrastructure/platforms/react/src/components/maintenanceRules/PlanificationEntretienForm.tsx

import React, { useState, useEffect } from 'react';
import { Moto, MaintenanceRule, Piece } from '../../types';
import { MotoService } from '../../services/motoService';
import { MaintenanceRuleService } from '../../services/maintenanceRuleService';
import { PieceService } from '../../services/pieceService';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';

interface PiecePlanifiee {
  pieceId: string;
  nom: string;
  quantite: number;
  prixUnitaire: number;
  reference: string;
  stockDisponible: number;
}

interface PlanificationEntretienFormProps {
  onSubmit: (planification: {
    motoId: string;
    datePrevue?: string;
    kilometragePrevu?: number;
    typeEntretien?: string;
    notes?: string;
    coutMainOeuvre: number;
    pieces: Array<{
      pieceId: string;
      quantite: number;
      prixUnitaire: number;
    }>;
  }) => void;
  onCancel: () => void;
}

const PlanificationEntretienForm: React.FC<PlanificationEntretienFormProps> = ({
  onSubmit,
}) => {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [maintenanceRules, setMaintenanceRules] = useState<MaintenanceRule[]>([]);
  const [selectedMoto, setSelectedMoto] = useState<Moto | null>(null);
  const [selectedRule, setSelectedRule] = useState<MaintenanceRule | null>(null);
  const navigate = useNavigate();

  const [piecesPlanifiees, setPiecesPlanifiees] = useState<PiecePlanifiee[]>([]);
  const [selectedPieceId, setSelectedPieceId] = useState<string>('');
  const [quantiteSelectionnee, setQuantiteSelectionnee] = useState<number>(1);

  const [formData, setFormData] = useState({
    motoId: '',
    datePrevue: '',
    kilometragePrevu: 0,
    typeEntretien: '',
    notes: '',
    coutMainOeuvre: 0,
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [motosData, rulesData, piecesData] = await Promise.all([
          MotoService.getAllMotos(),
          MaintenanceRuleService.getAllRules(),
          PieceService.getAllPieces()
        ]);
        setMotos(motosData);
        setMaintenanceRules(rulesData);
        setPieces(piecesData);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        toast.error('Erreur lors du chargement des données');
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (selectedMoto) {
      // Reset selectedRule d'abord
      setSelectedRule(null);
      
      // Chercher la règle correspondante
      const rule = maintenanceRules.find(r => r.modele === selectedMoto.model);
      if (rule) {
        setSelectedRule(rule);
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + rule.intervalleTemps);
        
        setFormData(prev => ({
          ...prev,
          typeEntretien: rule.typeEntretien,
          datePrevue: nextDate.toISOString().split('T')[0],
          kilometragePrevu: selectedMoto.kilometrage + rule.intervalleKilometrage
        }));
      }
    }
  }, [selectedMoto, maintenanceRules]);

  const handleMotoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const moto = motos.find(m => m.motoId === e.target.value);
    setSelectedMoto(moto || null);
    setFormData(prev => ({
      ...prev,
      motoId: e.target.value
    }));
  };


  const handleCancel = () => {
    navigate('/entretiens'); 
  };

    // Gestion des pièces
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
  
      // Vérifier si la pièce est déjà dans la liste
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
  
      // Reset de la sélection
      setSelectedPieceId('');
      setQuantiteSelectionnee(1);
    };
  
    const handleRemovePiece = (pieceId: string) => {
      setPiecesPlanifiees(prev => prev.filter(p => p.pieceId !== pieceId));
    };
  
    const calculateCoutTotalPieces = () => {
      return piecesPlanifiees.reduce((total, piece) => 
        total + (piece.quantite * piece.prixUnitaire), 0
      );
    };
  
    // Soumission du formulaire
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
  
      // commenté car les pièces peuvent être facultatives
      // if (piecesPlanifiees.length === 0) { 
      //   toast.error('Veuillez sélectionner au moins une pièce');
      //   return;
      // }
  
      const planification = {
        ...formData,
        pieces: piecesPlanifiees.map(p => ({
          pieceId: p.pieceId,
          quantite: p.quantite,
          prixUnitaire: p.prixUnitaire
        }))
      };
  
      onSubmit(planification);
    };

    const selectedPiece = pieces.find(piece => piece.pieceId === selectedPieceId);
    const maxQuantite = selectedPiece?.quantiteEnStock || 0;

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Planifier un entretien</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sélectionner une moto
          </label>
          <select
            value={formData.motoId}
            onChange={handleMotoChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          >
            <option value="">Sélectionnez une moto</option>
            {motos.map((moto) => (
              <option key={moto.motoId} value={moto.motoId}>
                {moto.marque} {moto.model} - {moto.serialNumber}
              </option>
            ))}
          </select>
        </div>

        {selectedMoto && selectedRule ? (
          <div className="bg-blue-50 p-4 rounded-md mb-4">
            <h3 className="font-medium text-blue-900">Règle de maintenance applicable</h3>
            <p>Intervalle kilométrique: {selectedRule.intervalleKilometrage} km</p>
            <p>Intervalle temps: {selectedRule.intervalleTemps} jours</p>
          </div>
        ) : selectedMoto && (
          <div className="bg-yellow-50 p-4 rounded-md mb-4">
            <h3 className="font-medium text-yellow-900">Attention</h3>
            <p>Aucune règle de maintenance n'est définie pour ce modèle de moto.</p>
            <p> Veuillez d'abord créer une règle de maintenance afin de planifier l'entretien de la moto sélectionnée.</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date prévue
          </label>
          <input
            type="date"
            value={formData.datePrevue}
            onChange={(e) => setFormData(prev => ({...prev, datePrevue: e.target.value}))}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
            disabled={!selectedRule}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Kilométrage prévu
          </label>
          <input
            type="number"
            value={formData.kilometragePrevu}
            onChange={(e) => setFormData(prev => ({...prev, kilometragePrevu: parseInt(e.target.value)}))}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Notes du technicien
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({...prev, notes: e.target.value}))}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            rows={3}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Type d'entretien
        </label>
        <select
          value={formData.typeEntretien}
          onChange={(e) => setFormData(prev => ({...prev, typeEntretien: e.target.value}))}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          required
          disabled={!selectedRule}
        >
          <option value="">Sélectionner un type</option>
          <option value="Préventif">Préventif</option>
          <option value="Curatif">Curatif</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Coût main d'œuvre (€)
        </label>
        <input
          type="number"
          value={formData.coutMainOeuvre}
          onChange={(e) => setFormData(prev => ({...prev, coutMainOeuvre: parseFloat(e.target.value)}))}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          min="0"
          step="0.01"
          required
        />
      </div>

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
                Quantité (Stock disponible : {maxQuantite})
              </label>
              <input
                type="number"
                value={quantiteSelectionnee}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (selectedPiece && value > selectedPiece.quantiteEnStock) {
                    toast.error(`La quantité ne peut pas dépasser le stock disponible (${selectedPiece.quantiteEnStock} unités)`);
                    return;
                  }
                  setQuantiteSelectionnee(value);
                }}
                min="1"
                max={maxQuantite}
                className={`mt-1 block w-full p-2 border rounded-lg ${
                  selectedPieceId && quantiteSelectionnee > maxQuantite 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300'
                }`}
                disabled={!selectedPieceId}
              />
              {selectedPieceId && quantiteSelectionnee > maxQuantite && (
                <p className="text-red-500 text-sm mt-1">
                  La quantité dépasse le stock disponible
                </p>
              )}
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

      <div className="mt-6 flex justify-end space-x-4">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Planifier
        </button>
      </div>
    </form>
  );
};

export default PlanificationEntretienForm;