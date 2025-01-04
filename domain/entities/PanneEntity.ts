import { UUID } from '../value-objects/UUID';

export class Panne {
  constructor(
    private readonly panneId: UUID,
    private readonly motoId: UUID,
    private readonly description: string,
    private readonly date: Date,
    private readonly actionCorrective: string,
    private readonly status: string,
    private readonly userId: UUID
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

  public getPanneId(): UUID {
    return this.panneId;
  }

  public getMotoId(): UUID {
    return this.motoId;
  }

  public getDescription(): string {
    return this.description;
  }

  public getDate(): Date {
    return this.date;
  }

  public getActionCorrective(): string {
    return this.actionCorrective;
  }

  public getStatus(): string {
    return this.status;
  }

  public getUserId(): UUID {
    return this.userId;
  }
}
