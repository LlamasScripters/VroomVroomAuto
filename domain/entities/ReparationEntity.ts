import { UUID } from '../value-objects/UUID';

export class Reparation {
  constructor(
    public readonly reparationId: UUID,
    public readonly panneId: UUID,
    public readonly description: string,
    public readonly dateReparation: Date,
    public readonly actionsCorrectives: string[],
    public readonly coutReparation: number,
    public readonly status: string,
    public readonly userId: UUID
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

}
