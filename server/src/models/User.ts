import { model, Schema, Document } from 'mongoose'

export interface UserDocument extends Document {
  username: string
  name: string
  password: string
  bio: string
  location: string
  profilePicture: string
  createdAt: Date
  modifiedAt: Date
}

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String, default: '' },
  location: { type: String, default: '' },
  profilePicture: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now }
})

export default model<UserDocument>('User', userSchema)
