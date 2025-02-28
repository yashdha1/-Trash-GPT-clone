import mongoose from "mongoose";
import colors from "colors";
export const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log("MONGODB connected!!!!")
        console.log(`MongoDB connected: ${conn.connection.host}` .bgGreen.black)
    } catch (error) {
        console.error(`Error: ${error.message}` .bgRed.black);
        process.exit(1);
    }
}