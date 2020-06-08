import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

type User = Document & {
  name: string;
  email: string;
  password: string;
};

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    set: (plaintextPassword: string) => {
      return bcrypt.hashSync(plaintextPassword, 8);
    },
    required: true,
  },
});

export default mongoose.model<User>("User", UserSchema);
