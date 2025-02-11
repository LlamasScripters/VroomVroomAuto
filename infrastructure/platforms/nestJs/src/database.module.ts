// src/database.module.ts
import { Module, OnModuleInit } from '@nestjs/common';
import { connection } from './modelsSQL/database';

@Module({})
export class DatabaseModule implements OnModuleInit {
  async onModuleInit() {
    try {
      await connection.authenticate();
      console.log('✅ [NestJS] Database connected successfully!');
    } catch (error) {
      console.error('❌ [NestJS] Unable to connect to the database:', error);
    }
  }
}
