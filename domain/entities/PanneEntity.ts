import { UUID } from '../value-objects/UUID';

export class Panne {
  constructor(
    public readonly panneId: UUID,
    public readonly motoId: UUID,
    public readonly description: string,
    public readonly date: Date,
    public readonly actionCorrective: string,
    public readonly status: string,
    public readonly userId: UUID
  ) {}

  public static create(
    panneId: UUID,
    motoId: UUID,
    description: string,
    date: Date,
    actionCorrective: string,
    status: string,
    userId: UUID
  ): Panne {
    return new Panne(panneId, motoId, description, date, actionCorrective, status, userId);
  }
  
}
