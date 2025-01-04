import { UUID } from '../value-objects/UUID';

export class Reparation {
  constructor(
    private readonly reparationId: UUID,
    private readonly panneId: UUID,
    private readonly description: string,
    private readonly dateReparation: Date,
    private readonly actionsCorrectives: string[],
    private readonly coutReparation: number,
    private readonly status: string,
    private readonly userId: UUID
  ) {}

  public static create(
    reparationId: UUID,
    panneId: UUID,
    description: string,
    dateReparation: Date,
    actionsCorrectives: string[],
    coutReparation: number,
    status: string,
    userId: UUID
  ): Reparation {
    return new Reparation(reparationId, panneId, description, dateReparation, actionsCorrectives, coutReparation, status, userId);
  }

  public getReparationId(): UUID {
    return this.reparationId;
  }

  public getPanneId(): UUID {
    return this.panneId;
  }

  public getDescription(): string {
    return this.description;
  }

  public getDateReparation(): Date {
    return this.dateReparation;
  }

  public getActionsCorrectives(): string[] {
    return this.actionsCorrectives;
  }

  public getCoutReparation(): number {
    return this.coutReparation;
  }

  public getStatus(): string {
    return this.status;
  }

  public getUserId(): UUID {
    return this.userId;
  }
}
