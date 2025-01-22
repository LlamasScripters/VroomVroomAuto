// application/services/MaintenancePlanningService.ts

// à déplacer dans la couche domain ?
import { UUID } from '@domain/value-objects/UUID';

export interface MaintenanceInterval {
  kilometrage: number;
  tempsJours: number;
}

export interface MaintenancePlanningResult {
  needsMaintenance: boolean;
  nextMaintenanceKilometrage: number;
  nextMaintenanceDate: Date;
  reason?: string;
}

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