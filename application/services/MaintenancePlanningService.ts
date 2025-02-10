// application/services/MaintenancePlanningService.ts

// à déplacer dans la couche domain ?
import { UUID } from '@domain/value-objects/UUID';
import { MaintenancePlanningResult, MaintenanceInterval } from '@application/dtos/MaintenancePlanningDTO';


export interface MaintenancePlanningService {
  calculateNextMaintenance(
    motoId: UUID,
    currentKilometrage: number,
    lastMaintenanceDate: Date,
    lastMaintenanceKm: number,
    maintenanceInterval: MaintenanceInterval
  ): MaintenancePlanningResult;

  validateMaintenanceRule(
    intervalleKilometrage: number,
    intervalleTemps: number,
    modele: string
  ): boolean;
}