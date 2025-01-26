import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectMongo = async (): Promise<void> => {
    try {
        if (!process.env.MONGODB_CONNECTION_STRING || !process.env.MONGODB_USER || !process.env.MONGODB_PASSWORD) {
            throw new Error("Missing MongoDB environment variables");
        }

        await mongoose.connect(
            process.env.MONGODB_CONNECTION_STRING!,
            {
                dbName: 'mydatabase',
                auth: {
                    username: process.env.MONGODB_USER!,
                    password: process.env.MONGODB_PASSWORD!,
                },
            },
        );
        console.log("MongoDB connection successful");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

export const disconnectMongo = async (): Promise<void> => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    } catch (error) {
        console.error('Error closing MongoDB connection:', error);
        process.exit(1);
    }
};
