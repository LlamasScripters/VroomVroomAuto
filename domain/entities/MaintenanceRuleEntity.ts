// domain/entities/MaintenanceRuleEntity.ts
import { UUID } from '../value-objects/UUID';

export class MaintenanceRule {
  constructor(
    public readonly ruleId: UUID,
    public readonly modele: string,
    public readonly intervalleKilometrage: number,
    public readonly intervalleTemps: number, // en jours
    public readonly typeEntretien: string
  ) {}

  public static create(
    ruleId: UUID,
    modele: string,
    intervalleKilometrage: number,
    intervalleTemps: number,
    typeEntretien: string
  ): MaintenanceRule {
    if (intervalleKilometrage < 0) {
      throw new Error('L\'intervalle kilométrique doit être positif');
    }
    if (intervalleTemps < 0) {
      throw new Error('L\'intervalle temps doit être positif');
    }
    return new MaintenanceRule(
      ruleId,
      modele,
      intervalleKilometrage,
      intervalleTemps,
      typeEntretien
    );
  }

  public needsMaintenance(kilometrageActuel: number, lastMaintenanceKm: number, lastMaintenanceDate: Date): boolean {
    const kmSinceLastMaintenance = kilometrageActuel - lastMaintenanceKm;
    const daysSinceLastMaintenance = this.getDaysSince(lastMaintenanceDate);
    
    return kmSinceLastMaintenance >= this.intervalleKilometrage || 
           daysSinceLastMaintenance >= this.intervalleTemps;
  }

  private getDaysSince(date: Date): number {
    const diffTime = Math.abs(new Date().getTime() - date.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}