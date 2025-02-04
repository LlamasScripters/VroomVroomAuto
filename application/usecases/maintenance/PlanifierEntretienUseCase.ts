// application/usecases/maintenance/PlanifierEntretienUseCase.ts
import { UUID } from '@domain/value-objects/UUID';
import { MaintenanceRuleRepository } from '@application/repositories/MaintenanceRuleRepository';
import { MotoRepository } from '@application/repositories/MotoRepository';
import { EntretienRepository } from '@application/repositories/EntretienRepository';
import { PieceRepository } from '@application/repositories/PieceRepository';
import { EntretienPieceRepository } from '@application/repositories/EntretienPieceRepository';
import { Entretien } from '@domain/entities/EntretienEntity';
import { EntretienPiece } from '@domain/entities/EntretienPieceEntity';
import { UserRepository } from '@application/repositories/UserRepository';
import { 
  PlanifierEntretienDTO,
  MaintenancePlanningResultDTO 
} from '@application/dtos/MaintenancePlanningDTO';

export class PlanifierEntretienUseCase {
  constructor(
    private maintenanceRuleRepository: MaintenanceRuleRepository,
    private motoRepository: MotoRepository,
    private entretienRepository: EntretienRepository,
    private pieceRepository: PieceRepository,
    private entretienPieceRepository: EntretienPieceRepository,
    private userRepository: UserRepository
  ) {}

  async planifier(dto: PlanifierEntretienDTO): Promise<MaintenancePlanningResultDTO> {
    try {
      // 1. récupération de la moto
      const moto = await this.motoRepository.findById(new UUID(dto.motoId));
      if (!moto) {
        throw new Error('Moto non trouvée');
      }

      // 2. récupération de la règle de maintenance pour le modèle
      const regle = await this.maintenanceRuleRepository.findByModele(moto.model);
      if (!regle) {
        throw new Error(`Aucune règle de maintenance trouvée pour le modèle ${moto.model}`);
      }

      // 3. vérification et réservation des pièces
      let coutPieces = 0;
      if (dto.pieces && dto.pieces.length > 0) {
        for (const piece of dto.pieces) {
          const pieceEntity = await this.pieceRepository.findById(new UUID(piece.pieceId));
          if (!pieceEntity) {
            throw new Error(`Pièce non trouvée: ${piece.pieceId}`);
          }
          if (pieceEntity.quantiteEnStock < piece.quantite) {
            throw new Error(`Stock insuffisant pour la pièce ${pieceEntity.nom}`);
          }
          coutPieces += piece.quantite * piece.prixUnitaire;
        }
      }

      // 4. Calcul des dates et kilométrages
      const datePrevue = dto.datePrevue ? new Date(dto.datePrevue) : this.calculerProchaineDate(regle.intervalleTemps);
      const kilometragePrevu = dto.kilometragePrevu || this.calculerProchainKilometrage(moto.kilometrage, regle.intervalleKilometrage);

      // vérif explicite de l'userId
      if (!dto.userId) {
        throw new Error('UserId manquant dans la requête');
      }

      console.log('DTO reçu:', {
        userId: dto.userId,
        motoId: dto.motoId,
      });

      const gestionnaire = await this.userRepository.findFirstGestionnaire();
      if (!gestionnaire) {
        throw new Error('Aucun gestionnaire disponible pour prendre en charge l\'entretien');
      }

      // 5. Création de l'entretien
      const nouvelEntretien = Entretien.create(
        new UUID(),               // entretienId
        moto.motoId,             // motoId
        dto.typeEntretien || regle.typeEntretien,  // typeEntretien
        datePrevue,              // datePrevue
        new Date(),              // dateRealisee
        kilometragePrevu,        // kilometrageEntretien
        dto.notes || '',         // recommandationsTechnicien
        '',                      // recommandationsGestionnaireClient
        'PLANIFIE',             // statut
        new UUID(dto.userId), //userId
        gestionnaire.userId, // gestionnaireId
        dto.coutMainOeuvre || 0, // coutMainOeuvre
        coutPieces,           // coutPieces
        {                        // motoDetails
            marque: moto.marque,
            model: moto.model,
            serialNumber: moto.serialNumber
        },
        undefined               // pieces (sera ajouté plus tard)
         
    );

      console.log('Entretien avant sauvegarde:', {
        userId: nouvelEntretien.userId.toString(),
        gestionnaireId: nouvelEntretien.gestionnaireId.toString()
      });

      const entretienSaved = await this.entretienRepository.save(nouvelEntretien);

      // 6. Association des pièces à l'entretien et mise à jour des stocks
      if (dto.pieces && dto.pieces.length > 0) {
        for (const piece of dto.pieces) {
          const entretienPiece = EntretienPiece.create(
            new UUID(),
            entretienSaved.entretienId,
            new UUID(piece.pieceId),
            piece.quantite,
            piece.prixUnitaire,
            new UUID(dto.userId)
          );
          await this.entretienPieceRepository.save(entretienPiece);
          
          // Mise à jour du stock
          const pieceEntity = await this.pieceRepository.findById(new UUID(piece.pieceId));
          if (pieceEntity) {
            const newStock = pieceEntity.quantiteEnStock - piece.quantite;
            await this.pieceRepository.updateStock(pieceEntity.pieceId, newStock);
          }
        }
      }

      return {
        success: true,
        entretienId: entretienSaved.entretienId.toString(),
        message: 'Entretien planifié avec succès',
        datePrevue: datePrevue.toISOString(),
        kilometragePrevu,
        modele: moto.model,
        marque: moto.marque,
        regleAppliquee: {
          intervalleKilometrage: regle.intervalleKilometrage,
          intervalleTemps: regle.intervalleTemps,
          typeEntretien: regle.typeEntretien
        }
      };

    } catch (error) {
      throw new Error(`Erreur lors de la planification: ${error}`);
    }
  }

  private calculerProchaineDate(intervalleJours: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + intervalleJours);
    return date;
  }

  private calculerProchainKilometrage(kilometrageActuel: number, intervalleKm: number): number {
    return kilometrageActuel + intervalleKm;
  }
}