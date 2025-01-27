import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectMongo = async (): Promise<void> => {
    try {
        const { MONGODB_CONNECTION_STRING, MONGODB_USER, MONGODB_PASSWORD } = process.env;

        if (!MONGODB_CONNECTION_STRING || !MONGODB_USER || !MONGODB_PASSWORD) {
            throw new Error("Missing MongoDB environment variables");
        }

        console.log("Connecting to MongoDB with connection string:", MONGODB_CONNECTION_STRING);

        await mongoose.connect(MONGODB_CONNECTION_STRING, {
            dbName: 'mydatabase',
            auth: {
                username: MONGODB_USER,
                password: MONGODB_PASSWORD,
            },
        });

        console.log("MongoDB connection successful");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
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
