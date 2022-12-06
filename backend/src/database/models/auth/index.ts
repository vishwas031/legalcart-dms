import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IAuthModel } from "../../../interfaces/auth";

const AuthSchema = new Schema(
  {
    userId: { type: String, trim: true, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

AuthSchema.pre<IAuthModel>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

AuthSchema.methods.matchPassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const AuthModel = model<IAuthModel>("Auth", AuthSchema);

export default AuthModel;
