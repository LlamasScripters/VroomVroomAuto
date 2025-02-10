import fs from 'fs';
import path from 'path';
import { connectMongo } from './mongo';
import mongoose from 'mongoose';

export const db: Record<string, mongoose.Model<any>> = {};

export const initializeModels = async (): Promise<void> => {
  await connectMongo();

  const files = fs.readdirSync(__dirname);

  for (const file of files) {
    if (['indexMongo.ts', 'mongo.ts'].includes(file)) continue;

    const modelPath = path.join(__dirname, file);

    const { default: modelInit } = await import(modelPath);

    const model = modelInit(mongoose);

    db[model.modelName] = model;
  }
}

