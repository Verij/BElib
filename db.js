import mongoose from 'mongoose';
import { connect } from 'mongoose';
import {config} from 'dotenv';
import { MONGODB_URI } from './config.js';



//mongodb+srv://admin:jyUm9sF9qY61VEKG@cluster0.vrlfm6b.mongodb.net/?retryWrites=true&w=majority


export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("esta conectada la DB")
  } catch (error) {
    console.log(error)
  }
}