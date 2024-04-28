import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true
  },
  likedMovies: Array
})

export const User = mongoose.model('users', userSchema);