import { Document } from "mongoose";

export interface IAuthModel extends Document {
  userId: string;
  password: string;
  matchPassword: (password: string) => Promise<boolean>;
}
