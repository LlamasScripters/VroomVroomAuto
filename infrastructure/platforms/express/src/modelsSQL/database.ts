import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';

export const connection = new Sequelize("postgres://user:password@postgres:5432/mydatabase", { dialect: 'postgres' });

export const connectToDatabase = async () => {
  try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
