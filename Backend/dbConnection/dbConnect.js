import mongoose from 'mongoose';
import dotenv from 'dotenv';

const dbConnect = async () => {
    mongoose.connect(process.env.MONGODB_URI, {
        dbName: 'RealEstateDB'
    }).then(() => {
        console.log("Database connected successfully.");
    }).catch((error) => {
        console.error("Database connection failed:", error);
    });
}

export default dbConnect;