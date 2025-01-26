import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.POSTGRES_LINK;
if (!connectionString) {
  throw new Error('POSTGRES_LINK environment variable is not defined');
}

const connection = new Sequelize(connectionString, {dialect: 'postgres'});

const connectToDatabase = async () => {
  try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { connectToDatabase, connection };