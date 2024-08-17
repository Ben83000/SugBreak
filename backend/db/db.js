import mongoose from 'mongoose';
import dotenv from 'dotenv';
import WebSocket from "ws"

dotenv.config();

export const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.API);
    console.log('MongoDb connected');
  } catch (error) {
    console.log(error);
    process.exit(1);
  } 
};



