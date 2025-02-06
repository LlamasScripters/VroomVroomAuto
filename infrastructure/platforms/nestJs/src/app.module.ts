// src/app.module.ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { IncidentModule } from './incident/incident.module';

@Module({
  imports: [
    // On déclare notre module de connexion DB
    DatabaseModule,
    // On déclare notre module Incident
    IncidentModule,
  ],
})
export class AppModule {}
