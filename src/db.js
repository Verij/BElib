import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:jyUm9sF9qY61VEKG@cluster0.vrlfm6b.mongodb.net/?retryWrites=true&w=majority');
    console.log("esta conectada la DB")
  } catch (error) {
    console.log(error)
  }
}