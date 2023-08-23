import mongoose from 'mongoose';

const libroSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  genero:{
    type: String,
    required: true,
  },
  lanzamiento: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},
  {
    timestamps: true
  }
);

export default mongoose.model('Libro', libroSchema);