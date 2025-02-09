// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Optionnel : un préfixe global
  // app.setGlobalPrefix('api/nestJs'); 
  // mais on l'a déjà mis dans le @Controller('api/nestJs/incident')
  // donc c'est à votre choix.
  app.enableCors({
    origin: 'http://localhost:4200'
  });
  await app.listen(4000);
  console.log(`NestJS app listening on http://localhost:4000`);
}
bootstrap();
