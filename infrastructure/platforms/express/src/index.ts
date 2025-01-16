import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDatabase } from './modelsSQL/database';
import db from "../src/modelsSQL/indexSQL";
import './modelsSQL/associations';

import motoRoutes from './routes/moto.route';
import entretienRoutes from './routes/entretien.route';

// Charger les variables d'environnement
dotenv.config();

// Initialiser l'application express
const app = express();
const host = "0.0.0.0";
// Middleware
app.use(bodyParser.json());

// Utilisation du middleware cors
app.use(cors());

//Routes
app.use('/api/motos', motoRoutes);
app.use('/api/entretien', entretienRoutes);

// Port
const PORT = 3000;

db.connection
  .sync({ alter: true })
  .then(() => console.log("Database synced"))

// Connect to Database and Start Server
connectToDatabase().then(() => {
  app.listen(PORT, host, () => {
    console.log(`Server listening on http://${host}:${PORT}`);
    console.log("test");
  });
}).catch((err: unknown) => {
  console.error('Failed to connect to the database', err);
});
