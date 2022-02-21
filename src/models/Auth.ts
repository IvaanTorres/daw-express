import mongoose from 'mongoose'

export interface User extends mongoose.Document {
  name: String
  password: String
  role: String
}

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
})

export const userModel = mongoose.model<User>('user', UserSchema)
