import { model, Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  name: string;
  password: string;
  profilePicture: string;
}

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

export default model<UserDocument>('User', userSchema);
