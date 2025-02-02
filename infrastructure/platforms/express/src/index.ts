import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { connection, connectToDatabase } from './modelsSQL/database';
import { initializeModels } from "./modelsMongo/indexMongo";
import { denormalizeData } from "./bin/denormalizeIntoMongo";
import './modelsSQL/associations';

import motoRoutes from './routes/moto.route';
import entretienRoutes from './routes/entretien.route';
import panneRoutes from './routes/panne.route';
import maintenanceRuleRoutes from './routes/maintenanceRule.route';
import userRoute from './routes/user.route';
import authRouter from "./routes/auth.route";


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
app.use('/api/panne', panneRoutes);
app.use('/api/maintenance', maintenanceRuleRoutes);
app.use('/api/user', userRoute);
app.use('/api/auth', authRouter);

// Port
const PORT = 3000;

// Connection à la base de données SQL et MongoDB
connectToDatabase()
  .then(() => {
    console.log("Connected to SQL database successfully.");

    return connection.sync();
  })
  .then(() => {
    console.log("SQL database & tables created!");

    return initializeModels();
  })
  .then(() => {
    console.log("MongoDB models initialized.");

    return denormalizeData();
  })
  .then(() => {
    console.log("MongoDB migrations completed.");

    // Lancement du serveur Express
    app.listen(PORT, host, () => {
      console.log(`Server listening on http://${host}:${PORT}`);
      console.log("Initial setup completed successfully.");
    });
  })
  .catch((err: unknown) => {
    console.error("An error occurred during setup:", err);
  });
