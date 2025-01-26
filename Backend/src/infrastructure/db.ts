import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connectionString = process.env.MONGODB_URI;
        if (!connectionString){
            throw new Error("MongoDB connection string is not provided");
        }
        await mongoose.connect(connectionString);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("MongoDB connection error: " + error)
    }
}