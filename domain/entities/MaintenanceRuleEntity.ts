// domain/entities/MaintenanceRuleEntity.ts

import { UUID } from '@domain/value-objects/UUID';

export class MaintenanceRule {
  constructor(
    public readonly ruleId: UUID,
    public readonly modele: string, 
    public readonly intervalleKilometrage: number,
    public readonly intervalleTemps: number,
    public readonly typeEntretien: string,
    public readonly nombreEntretiensPrevus?: number,
    public readonly dateDernierEntretien?: Date
  ) {
    this.validateRule();
  }

  private validateRule(): void {
    if (this.intervalleKilometrage < 0) {
      throw new Error("L'intervalle kilométrique doit être positif");
    }
    if (this.intervalleTemps < 0) {
      throw new Error("L'intervalle temps doit être positif");
    }
    if (!this.modele || this.modele.trim().length === 0) {
      throw new Error("Le modèle est requis");
    }
    if (!this.typeEntretien || this.typeEntretien.trim().length === 0) {
      throw new Error("Le type d'entretien est requis");
    }
  }

  public static create(
    ruleId: UUID,
    modele: string,
    intervalleKilometrage: number,
    intervalleTemps: number,
    typeEntretien: string,
    nombreEntretiensPrevus?: number,
    dateDernierEntretien?: Date
  ): MaintenanceRule {
    return new MaintenanceRule(
      ruleId, 
      modele, 
      intervalleKilometrage,
      intervalleTemps,
      typeEntretien,
      nombreEntretiensPrevus,
      dateDernierEntretien
    );
  }

  public needsMaintenance(kilometrageActuel: number, lastMaintenanceKm: number, lastMaintenanceDate: Date): boolean {
    const kmSinceLastMaintenance = kilometrageActuel - lastMaintenanceKm;
    const daysSinceLastMaintenance = this.getDaysSince(lastMaintenanceDate);

    return kmSinceLastMaintenance >= this.intervalleKilometrage || 
           daysSinceLastMaintenance >= this.intervalleTemps;
  }

  public getNextMaintenanceKilometrage(currentKilometrage: number): number {
    return currentKilometrage + this.intervalleKilometrage;
  }

  public getNextMaintenanceDate(fromDate: Date = new Date()): Date {
    const nextDate = new Date(fromDate);
    nextDate.setDate(nextDate.getDate() + this.intervalleTemps);
    return nextDate;
  }

  private getDaysSince(date: Date): number {
    const diffTime = Math.abs(Date.now() - date.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  public equals(other: MaintenanceRule): boolean {
    return this.ruleId.equals(other.ruleId);
  }

  public toString(): string {
    return `Règle de maintenance pour ${this.modele}: ${this.intervalleKilometrage}km ou ${this.intervalleTemps} jours`;
  }
}