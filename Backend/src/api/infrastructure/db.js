import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connectionString = process.env.MONGODB_URI;
        await mongoose.connect(connectionString);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("MongoDB connection error: " + error)
    }
}