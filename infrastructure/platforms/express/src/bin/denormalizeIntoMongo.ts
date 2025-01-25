import fs from 'fs';
import path from 'path';
import { connectMongo, disconnectMongo } from '../modelsMongo/mongo';

const migrationsDir = path.join(__dirname, '../insertsMongo');

export const denormalizeData = async (isMongoConnected: boolean = true): Promise<void> => {
  if (!isMongoConnected) {
    await connectMongo();
  }

  const files = fs.readdirSync(migrationsDir);

  for (const file of files) {
    if (file.endsWith('.ts')) {
      try {
        const migrationPath = path.join(migrationsDir, file);

        const { default: migration } = await import(migrationPath);

        if (typeof migration === 'function') {
          await migration();
          console.log(`Migration ${file} executed successfully.`);
        } else {
          console.error(`Migration ${file} does not export a function.`);
        }
      } catch (error) {
        console.error(`Error executing migration ${file}:`, error);
      }
    }
  }

  // await disconnectMongo();
};

