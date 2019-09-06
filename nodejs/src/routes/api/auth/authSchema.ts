import mongoose from "mongoose";

export interface IUser {
  username: string,
  password: string,
  admin : boolean,
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin : {type: Boolean}
});

export const User = mongoose.model('User', userSchema);