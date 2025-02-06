// src/incident/incident.module.ts
import { Module } from '@nestjs/common';
import { IncidentController } from './incident.controller';
import { IncidentSQLRepository } from '../repositories/incident.repository.sql'; 
import { IncidentUseCases } from '../../../../../application/usecases/incident/IncidentCrudUseCases';

@Module({
  controllers: [IncidentController],
  providers: [
    {
      provide: 'IncidentUseCases',
      useFactory: () => {
        const repository = new IncidentSQLRepository();
        return new IncidentUseCases(repository);
      },
    },
  ],
})
export class IncidentModule {}
