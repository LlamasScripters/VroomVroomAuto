// application/usecases/maintenance/PlanifierEntretienUseCase.ts

import { UUID } from '@domain/value-objects/UUID';
import { MaintenanceRuleRepository } from '@application/repositories/MaintenanceRuleRepository';
import { MotoRepository } from '@application/repositories/MotoRepository';
import { EntretienRepository } from '@application/repositories/EntretienRepository';
import { Entretien } from '@domain/entities/EntretienEntity';
import { 
  PlanifierEntretienDTO,
  MaintenancePlanningResultDTO 
} from '@application/dtos/MaintenancePlanningDTO';
// import { EntretienMapper } from '@application/mappers/EntretienMapper';

export class PlanifierEntretienUseCase {
  constructor(
    private maintenanceRuleRepository: MaintenanceRuleRepository,
    private motoRepository: MotoRepository,
    private entretienRepository: EntretienRepository
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

      // 3. calcul de la prochaine date d'entretien
      const datePrevue = dto.datePrevue ? new Date(dto.datePrevue) : this.calculerProchaineDate(regle.intervalleTemps);
      const kilometragePrevu = dto.kilometragePrevu || this.calculerProchainKilometrage(moto.kilometrage, regle.intervalleKilometrage);

      // 4. création l'entretien planifié
      const nouvelEntretien = Entretien.create(
        new UUID(),
        moto.motoId,
        dto.typeEntretien || regle.typeEntretien,
        datePrevue,
        new Date(), // dateRealisee sera mise à jour lors de l'exécution
        kilometragePrevu,
        dto.notes || '',
        '', // recommandationsGestionnaireClient à remplir plus tard
        0, // coût à définir
        'PLANIFIE',
        new UUID() // userId à gérer avec l'authh
      );

      const entretienSaved = await this.entretienRepository.save(nouvelEntretien);

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