// src/database.ts
import { Sequelize } from 'sequelize';

// Ajustez la chaîne de connexion et les options :
export const connection = new Sequelize('postgres://user:password@postgres:5432/mydatabase', {
  logging: false,
});
