import generateUuid from "../database/common";
import UserModel from "../database/models/user";
import { IUserCreateRequest } from "../interfaces/user";
import { generateAuthForUser } from "./authService";

export const createUser = async (req: IUserCreateRequest) => {
  if (!req.user) throw new Error("user not found!");
  const user = await new UserModel({
    _id: generateUuid(),
    email: req.body.email,
    created: Date(),
    updated: Date(),
    deleted: false,
    companyId: req.user.companyId,
    accessRole: req.body.accessRole,
    name: req.body.name,
  }).save();
  await generateAuthForUser(user, undefined, true);
  return user;
};
