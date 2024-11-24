import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { connectToDatabase } from './modelsSQL/database';

// Charger les variables d'environnement
dotenv.config();

// Initialiser l'application express
const app = express();
const host = "0.0.0.0";
// Middleware
app.use(bodyParser.json());

// Port
const PORT = 3000;

// Connect to Database and Start Server
connectToDatabase().then(() => {
  app.listen(PORT, host, () => {
    console.log(`Server listening on http://${host}:${PORT}`);
    console.log("test");
  });
}).catch((err: unknown) => {
  console.error('Failed to connect to the database', err);
});
