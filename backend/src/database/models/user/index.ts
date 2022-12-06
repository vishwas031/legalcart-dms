import { model, Schema } from "mongoose";
import { AccessRole, IUserModel } from "../../../interfaces/user";
import { CompanyScopedSchema } from "../base";

const UserSchema = new CompanyScopedSchema(
  {
    email: { type: String, trim: true, required: true, unique: true },
    name: new Schema({
      first: { type: String, trim: true, required: true },
      last: { type: String, trim: true, required: false, default: null },
    }),
    accessRole: { type: AccessRole, required: true },
    companyId: { type: String, trim: true, required: true, unique: true },
  },
  {
    versionKey: false,
  }
);

const UserModel = model<IUserModel>("User", UserSchema);

export default UserModel;
